import { Text, View } from "react-native"
//import { useTranslation } from "react-i18next"
import { useTypedTranslation } from "@/language/useTypedTranslation"

export default function OverviewScreen() {
  const { t } = useTypedTranslation();//const { t } = useTranslation()

  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <Text className='text-primary-600 text-3xl'>
        {t("screens.goals.title")}
      </Text>
    </View>
  )
}
