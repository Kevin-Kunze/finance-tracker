import { GEMINI_API_KEY } from './GEMINI_API_KEY.js';

import { useTranslation } from "react-i18next"
import { TouchableOpacity, Dimensions, View, Text } from "react-native"
import { router, useFocusEffect } from "expo-router"
import { useState, useRef } from "react"
import { CameraType, useCameraPermissions, CameraView } from "expo-camera"
import { useIsFocused } from '@react-navigation/native';



export default function CameraScreen() 
{
  // Variables
  // * * * * * * * * * * * * 

  // Translation
  const { t } = useTranslation();

  // Camera variables
  const facing = "back" as CameraType;
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  
  // View variables 
  const isFocused = useIsFocused();
  const windowWidth = Dimensions.get("window").width;
  const [isProcessing, changeState] = useState<Boolean>(false);
  

  // Model
  // * * * * * * * * * * * * 

  async function takePicture()
  {
    if(cameraRef.current) 
    {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      askGemini(photo);
    }  
  }

  /*
    Function to open galery
  */

  async function askGemini(photo) 
  {
    const apiKey = GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    /*
      HERE WE EDIT THE PROMPTS AND THE MODEL 
    */

    // Just for testing at the moment, needs data from database and refacotor
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
    
    changeState(true);

    try 
    {
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
      changeState(false);
      router.push({pathname: "/scan/input", params: {geminiResponse: data.candidates[0].content.parts[0].text}});
    } 
    catch (error) 
    {
      console.error("Error sending picture to Gemini API:", error);
    }

    changeState(false);
  }
 

  // Main
  // * * * * * * * * * * * * 

  if(!permission?.granted) // Check if camera permission is given
  {
    requestPermission();
  }


  // View
  // * * * * * * * * * * * * 

  if(!permission?.granted) // Check if camera permission is given
  {
    // No camery permission given
    return(
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>
          {t("screens.camera.waiting_permission")}
        </Text>
      </View>
    );
  }
  else if(!isProcessing) // Camera View
  {
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        { isFocused?(
        <View style={{width: windowWidth, flex: 1, justifyContent: "center"}}>
          <CameraView shutterSound={false} facing={facing} style={{flex: 1}} ref={cameraRef}/>
        </View>
        ) : null }

        <View style={{position: "absolute", bottom: 50+(windowWidth/4.5-windowWidth/3.8)/2, left: windowWidth/2-(windowWidth/3.8/2), borderRadius: 90, opacity: 0.5, backgroundColor: "transparent", borderColor: "white", borderWidth: 4.5, width: windowWidth/3.8, height: windowWidth/3.8}}/>
        <TouchableOpacity onPress={()=>{takePicture()}} style={{position: "absolute", bottom: 50, left: windowWidth/2-(windowWidth/4.5/2), borderRadius: 90, opacity: 0.4, backgroundColor: "white", width: windowWidth/4.5, height: windowWidth/4.5}}/>
      </View>
    );
  }
  else // Process View
  {
    return(
    <View className='flex-1 items-center justify-center bg-background'>
      <Text>
        Processing...
      </Text>
    </View>
    );
  }
}
