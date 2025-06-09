import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

export default function BubbleScreen() {
  const { t } = useTranslation()

  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <Text className='text-primary-600 text-3xl'>
        {t("screens.bubbles.title")}
      </Text>
    </View>
  )
}
