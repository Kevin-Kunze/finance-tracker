import { useTranslation } from "react-i18next"
import { TouchableOpacity, Dimensions, View, Text } from "react-native"

import { useState, useRef } from "react"
import { CameraType, useCameraPermissions, CameraView, CameraViewRef } from "expo-camera"
import { useIsFocused } from '@react-navigation/native';


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
  const cameraRef = useRef<CameraViewRef>(null);


  // Check if permission is given
  if(!permission?.granted)
  {
    requestPermission();
    // No permission given
    return(
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>
          {t("scan.waiting_permission")}
        </Text>
      </View>
    );
  }




  // Logic

  async function takePicture()
  {
    if(cameraRef.current)
    {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  }
 
  return (
    <View className='flex-1 items-center justify-center bg-background'>
      { isFocused?(
      <View style={{width: windowWidth, flex: 1, justifyContent: "center"}}>
        <CameraView facing={facing} style={{flex: 1}} ref={cameraRef}/>
      </View>
      ) : null }

      <TouchableOpacity onPress={()=>{takePicture()}} style={{position: "absolute", bottom: 30, left: windowWidth/2-(windowWidth/4/2), borderRadius: 50, backgroundColor: "#ECA91A", width: windowWidth/4, height: windowWidth/4}}/>
    </View>
  )
}
