import { useTranslation } from "react-i18next"
import { View, Text } from "react-native"
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react"


export default function InputScreen() 
{
  // Variables
  // * * * * * * * * * * * * 

  const { t } = useTranslation();
  const route = useRoute();
  let { geminiResponse = "" } = route.params || {};
  const [transactions, changeTransactions] = useState({});


  // Model
  // * * * * * * * * * * * * 

  function processGeminiResponse()
  {
    if(geminiResponse != "")
    {
      console.log("PROCSESSING");
      const cleaned = geminiResponse.replace(/`/g, "").replace("json", "");
      const parsed = JSON.parse(cleaned);
      const mapped = parsed.map(item => ({
        "name": item.name,
        "term": item.term,
        "amount": item.amount,
        "currency": item.currency
      }));

      changeTransactions(mapped);
      console.log(mapped);
    }
  }


  // Main
  // * * * * * * * * * * * * 

  useEffect(() => {
    console.log("EFFECT");
    processGeminiResponse();
  }, [geminiResponse]);


  // View
  // * * * * * * * * * * * * 

  return (
    <View className='flex-1 items-center justify-center bg-background'>
        <Text>{geminiResponse?geminiResponse : ""}</Text>
    </View>
  )
}
