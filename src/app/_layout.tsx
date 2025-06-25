import "../i18n"

import { Stack } from "expo-router"
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite"
import { Suspense, useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import migrations from "@/db/migrations/migrations"
import { DB_NAME } from "@/db/db_name"
import { initializeDatabase } from "@/db"
import { useColorScheme } from "nativewind"
import "../global.css"
import { storage } from "@/utils/storage"
import { useTypedTranslation } from "@/language/useTypedTranslation"

export default function RootLayout() {
  const expoDb = openDatabaseSync(DB_NAME)
  const db = drizzle(expoDb)

  const { error } = useMigrations(db, migrations)
  if (error) {
    console.log(error)
  }

  useEffect(() => {
    initializeDatabase().catch((error) => {
      console.error("Failed to initialize database:", error)
    })
  }, [])

  const { colorScheme, setColorScheme } = useColorScheme()
  const { i18n } = useTypedTranslation()

  storage.getString("appearance").then((appearance) => {
    setColorScheme((appearance as "light" | "dark") ?? colorScheme)
  })
  storage.getString("language").then((language) => {
    if (language) {
      i18n.changeLanguage(language)
    }
  })

  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLiteProvider databaseName={DB_NAME} useSuspense>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  )
}
