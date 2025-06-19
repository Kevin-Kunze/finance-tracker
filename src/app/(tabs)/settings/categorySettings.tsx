import ScreenTitle from "@/components/ScreenTitle"
import { useTranslation } from "react-i18next"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CategorySettingsScreen() {
  const { t } = useTranslation()
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-primary-50 dark:bg-primary-950'>
      <ScreenTitle
        title={t("screens.settings.categorySettings")}
        showBackButton={true}
      />
    </SafeAreaView>
  )
}
