import { Text, View } from "react-native"
import { useColorScheme } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTypedTranslation } from "@/language/useTypedTranslation" //import { useTranslation } from "react-i18next"
import { colors } from "@/assets/colors"
import ScreenTitle from "@/components/tabs/ScreenTitle"
import DuoSwitch from "@/components/buttons/DuoSwitch"
import { ScrollView } from "react-native-gesture-handler"
import { storage } from "@/utils/storage"

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const { t, i18n } = useTypedTranslation()

  const handleLanguageSwitch = (language: "de" | "en") => {
    i18n.changeLanguage(language)
    storage.setString("language", language)
  }

  const handleToggleColorScheme = () => {
    toggleColorScheme()
    storage.setString("appearance", colorScheme === "dark" ? "light" : "dark")
  }

  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-primary-950'>
      <ScrollView className='mx-4'>
        <ScreenTitle
          title={t("screens.settings.title")}
          showBackButton={false}
        />

        <View className='gap-6'>
          {/* Appearance Section */}
          <View className='bg-gray-100 dark:bg-primary-800 rounded-lg overflow-hidden p-4 gap-3'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              {t("screens.settings.personalization")}
            </Text>

            <View className='flex-row justify-between items-center'>
              <View className='flex-row items-center gap-3'>
                <Ionicons
                  name={colorScheme === "light" ? "sunny" : "moon"}
                  size={22}
                  color={
                    colorScheme === "light"
                      ? colors.primary[600]
                      : colors.gray[50]
                  }
                />
                <Text className='text-gray-900 dark:text-gray-100'>
                  {t("screens.settings.appearance")}
                </Text>
              </View>

              <DuoSwitch
                value={colorScheme === "dark"}
                onChange={handleToggleColorScheme}
                options={[
                  t("screens.settings.light"),
                  t("screens.settings.dark"),
                ]}
              />
            </View>
            <View className='flex-row justify-between items-center'>
              <View className='flex-row items-center gap-3'>
                <Ionicons
                  name='globe-outline'
                  size={22}
                  color={
                    colorScheme === "light"
                      ? colors.primary[600]
                      : colors.gray[50]
                  }
                />
                <Text className='text-gray-900 dark:text-gray-100'>
                  {t("screens.settings.language")}
                </Text>
              </View>

              <DuoSwitch
                value={i18n.language === "en"}
                onChange={() => {
                  handleLanguageSwitch(i18n.language === "en" ? "de" : "en")
                }}
                options={["Deutsch", "English"]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
