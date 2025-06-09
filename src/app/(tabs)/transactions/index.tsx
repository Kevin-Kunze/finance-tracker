import CircularButton from "@/components/CircularButton"
import { useTranslation } from "react-i18next"
import { View, Text } from "react-native"

export default function TransactionsScreen() {
  const { t } = useTranslation()

  return (
    <View className='flex-1 items-center justify-center bg-background'>
     <CircularButton onPress={() => {}} icon="calendar"  />
    </View>
  )
}
