import { useTranslation } from "react-i18next"
import { View, Text } from "react-native"
import { useRoute } from '@react-navigation/native';


export default function InputScreen() 
{
  const { t } = useTranslation();
  const route = useRoute();
  const { geminiResponse = "" } = route.params || {};

  
  return (
    <View className='flex-1 items-center justify-center bg-background'>
        <Text>{geminiResponse?geminiResponse : ""}</Text>
    </View>
  )
}
