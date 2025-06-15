import { Text, View, Switch, TouchableOpacity } from "react-native"
import { useColorScheme } from "nativewind"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTypedTranslation } from "@/language/useTypedTranslation" //import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { colors } from "@/assets/colors"
import ScreenTitle from "@/components/ScreenTitle"
import { router } from "expo-router"

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const { t, i18n } = useTypedTranslation();

  // Lokaler State für Sprach-Switch (true = Deutsch, false = Englisch)
  const [isGerman, setIsGerman] = useState(i18n.language === "de")

  // Sprache wechseln
  const toggleLanguage = () => {
    const newLang = isGerman ? "en" : "de"
    i18n.changeLanguage(newLang)
    setIsGerman(!isGerman)
  }

  // Sync Switch, wenn Sprache extern geändert wird
  useEffect(() => {
    setIsGerman(i18n.language === "de")
  }, [i18n.language])

  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-primary-950'>
      <ScreenTitle title={t("screens.settings.title")} showBackButton={false} />

      <View className='px-4 py-6 gap-6'>
        {/* General Section */}
        <View className='bg-gray-100 dark:bg-primary-800 rounded-lg overflow-hidden p-4'>
          <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            {t("screens.settings.general")}
          </Text>

          <View className='flex-row items-center gap-3'>
            <TouchableOpacity
              className='items-center justify-center p-2 bg-primary-700 rounded-lg'
              onPress={() => router.push("/settings/categorySettings")}
            >
              <Text className='text-gray-900 dark:text-gray-100'>
                {t("screens.settings.categorySettings")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Appearance Section */}
        <View className='bg-gray-100 dark:bg-primary-800 rounded-lg overflow-hidden p-4'>
          <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            {t("screens.settings.appearance")}
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
                {t("screens.settings.darkMode")}
              </Text>
            </View>

            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleColorScheme}
              trackColor={{ false: colors.gray[500], true: colors.gray[500] }}
              thumbColor={
                colorScheme === "light" ? colors.primary[600] : colors.gray[200]
              }
            />
          </View>
        </View>

        {/* Language Section */}
        <View className='bg-gray-100 dark:bg-primary-800 rounded-lg overflow-hidden p-4'>
          <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1'>
            {t("screens.settings.language")}
          </Text>

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
                {isGerman
                  ? t("screens.settings.german")
                  : t("screens.settings.english")}
              </Text>
            </View>

            <Switch
              value={isGerman}
              onValueChange={toggleLanguage}
              trackColor={{ false: colors.gray[500], true: colors.gray[500] }}
              thumbColor={
                colorScheme === "light" ? colors.primary[600] : colors.gray[200]
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
