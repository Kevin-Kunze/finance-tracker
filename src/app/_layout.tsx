import "../i18n"

import { Stack } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"
import { Suspense, useEffect } from "react"
import { ActivityIndicator } from "react-native"
import migrations from "@/db/migrations/migrations"
import { migrate } from "drizzle-orm/expo-sqlite/migrator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { DB_NAME } from "@/db/db_name"
import { useDb, initializeDatabase } from "@/db"
import { useColorScheme } from "nativewind"
import "../global.css"
import { storage } from "@/utils/storage"
import { useTypedTranslation } from "@/language/useTypedTranslation"

function DatabaseInitializer() {
  const db = useDb()
  migrate(db, migrations)

  useEffect(() => {
    initializeDatabase().catch((error) => {
      console.error("Failed to initialize database:", error)
    })
  }, [])

  return null
}

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme()
  const { i18n } = useTypedTranslation()

  useEffect(() => {
    storage.getString("appearance").then((appearance) => {
      setColorScheme((appearance as "light" | "dark") ?? colorScheme)
    })
    storage.getString("language").then((language) => {
      if (language) {
        i18n.changeLanguage(language)
      }
    })
  }, [colorScheme, i18n, setColorScheme])

  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLiteProvider databaseName={DB_NAME} useSuspense>
        <DatabaseInitializer />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  )
}
