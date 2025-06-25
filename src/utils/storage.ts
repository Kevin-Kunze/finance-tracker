import AsyncStorage from "@react-native-async-storage/async-storage"

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "userPreferences",
  THEME: "theme",
  LANGUAGE: "language",
  CURRENCY: "defaultCurrency",
  FIRST_LAUNCH: "isFirstLaunch",
} as const

// User preferences type
export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  defaultCurrency: string
  notificationsEnabled: boolean
  biometricEnabled: boolean
}

// Generic storage functions
export const storage = {
  // Store string value
  setString: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.error(`Error storing string for key ${key}:`, error)
      throw error
    }
  },

  // Get string value
  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.error(`Error retrieving string for key ${key}:`, error)
      return null
    }
  },

  // Store object
  setObject: async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error storing object for key ${key}:`, error)
      throw error
    }
  },

  // Get object
  getObject: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error(`Error retrieving object for key ${key}:`, error)
      return null
    }
  },

  // Remove item
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item for key ${key}:`, error)
      throw error
    }
  },

  // Clear all storage
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error("Error clearing storage:", error)
      throw error
    }
  },
}

// Specific functions for user preferences
export const userPreferences = {
  get: async (): Promise<UserPreferences | null> => {
    return storage.getObject<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES)
  },

  set: async (preferences: UserPreferences): Promise<void> => {
    return storage.setObject(STORAGE_KEYS.USER_PREFERENCES, preferences)
  },

  update: async (updates: Partial<UserPreferences>): Promise<void> => {
    const current = await userPreferences.get()
    const updated = { ...current, ...updates } as UserPreferences
    return userPreferences.set(updated)
  },
}

// Helper functions
export const isFirstLaunch = async (): Promise<boolean> => {
  const value = await storage.getString(STORAGE_KEYS.FIRST_LAUNCH)
  return value === null
}

export const setFirstLaunchComplete = async (): Promise<void> => {
  return storage.setString(STORAGE_KEYS.FIRST_LAUNCH, "false")
}
