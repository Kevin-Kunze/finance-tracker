import { useTranslation } from "react-i18next"
import { TouchableOpacity, Dimensions, View, Text } from "react-native"

import { router, useFocusEffect } from "expo-router"

import { useState, useRef } from "react"
import { CameraType, useCameraPermissions, CameraView } from "expo-camera"
import { useIsFocused } from '@react-navigation/native';

import { GEMINI_API_KEY } from './GEMINI_API_KEY.js';


export default function ScanScreen() 
{
  const { t } = useTranslation();

  // back => back camera  
  const facing = "back" as CameraType;
  // saves permission for camera usage 
  const [permission, requestPermission] = useCameraPermissions();
  // Used to deactivade CameraView on tab change
  const isFocused = useIsFocused();
  const windowWidth = Dimensions.get("window").width;
  const cameraRef = useRef(null);


  // Check if permission is given
  if(!permission?.granted)
  {
    requestPermission();
    // No permission given
    return(
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>
          {t("screens.camera.waiting_permission")}
        </Text>
      </View>
    );
  }




  // Logic

  async function takePicture() 
  {
    if(cameraRef.current) 
    {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });

      const apiKey = GEMINI_API_KEY;
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const textInput = "Gib mir eine JSON-Antwort zurück. Erkenne in diesem Bild alle Artikel mit ihrem Preis und einem erkannten Namen (name_scan). Bei Ausgaben soll der Betrag negativ in der Ausgabe sein. Alle Einnahmen und Rabatte sollen unter Einnahmen kategorisiert werden und positiv in der Ausgabe sein." +
        "Leite aus name_scan eine allgemeinere Produktbezeichnung ab (name). Im Anhang sind alle schon existierenden Produktbezeichnungen, an denen kannst du dich orintieren. Ordne jeden Artikel genau einer Kategorie zu, sei Kreativ und ordne es möglichst tief im Baum ein . " +
        "Verwende dabei nur die Kategorie-ID aus der folgenden Liste. Verwende nur die Währungs ids aus der folgenden Liste. Gib für jeden Artikel ein JSON-Objekt mit diesen Feldern zurück: " +
        "- name_scan (Kurzbezeichnung aus dem Bild) " +
        "- name (allgemeinere Produktbezeichnung) " +
        "- amount (Preis/Betrag in Euro) " +
        "- category_id (ID der zugewiesenen Kategorie)" +
        "- original_currency_id (ursprüngliche Währung)" +
        "- original_amount (ursprünglicher Preis/Betrag in der original Währung, Ausgaben sollen negativ sein, Einnahmen positiv)" +
        "- quantity (Menge in Anzahl, Gewicht oder Volumen mit Einheit angegeben)";
      


      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: textInput },
                  {
                    inlineData: {
                      mimeType: photo.base64 ? 'image/jpeg' : 'application/octet-stream',
                      data: photo.base64
                    }
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) 
        {
          const errorData = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }

        const data = await response.json();
        console.log(data.candidates[0].content.parts[0].text);

      } catch (error) {
        console.error("Error sending picture to Gemini API:", error);
      }

      router.push("./input");
    }
  }
 
  return (
    <View className='flex-1 items-center justify-center bg-background'>
      { isFocused?(
      <View style={{width: windowWidth, flex: 1, justifyContent: "center"}}>
        <CameraView facing={facing} style={{flex: 1}} ref={cameraRef}/>
      </View>
      ) : null }

      <View style={{position: "absolute", bottom: 50+(windowWidth/4.5-windowWidth/3.8)/2, left: windowWidth/2-(windowWidth/3.8/2), borderRadius: 90, opacity: 0.5, backgroundColor: "transparent", borderColor: "white", borderWidth: 4.5, width: windowWidth/3.8, height: windowWidth/3.8}}/>
      <TouchableOpacity onPress={()=>{takePicture()}} style={{position: "absolute", bottom: 50, left: windowWidth/2-(windowWidth/4.5/2), borderRadius: 90, opacity: 0.4, backgroundColor: "white", width: windowWidth/4.5, height: windowWidth/4.5}}/>
    </View>
  )
}
