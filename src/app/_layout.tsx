import "../i18n";

import { Stack } from "expo-router"
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite"
import { Suspense } from "react"
import { ActivityIndicator } from "react-native"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import migrations from "@/db/migrations/migrations"
import { DB_NAME } from "@/db"
import "../global.css"

export default function RootLayout() {
  const expoDb = openDatabaseSync(DB_NAME)
  const db = drizzle(expoDb)

  const { error } = useMigrations(db, migrations)
  if (error) {
    console.log(error)
  }

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
