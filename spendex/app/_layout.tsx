import { Stack } from "expo-router"
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite"
import { Suspense } from "react"
import { ActivityIndicator } from "react-native"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import migrations from "@/db/migrations/migrations"
import "../global.css"

export const DATABASE_NAME = "spendex.db"

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME)
  const db = drizzle(expoDb)
  const { success, error } = useMigrations(db, migrations)
  console.log("Migrations success:", success)
  if (error) console.error("Migration error:", error)

  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  )
}
