import { Tabs } from "expo-router"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { useColorScheme } from "nativewind"
import TabsButton from "@/components/TabsButton"
import { colors } from "@/assets/colors"
import { useTranslation } from "react-i18next"

export default function TabLayout() {
  const { t } = useTranslation()
  const { colorScheme } = useColorScheme()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:
            colorScheme === "light" ? colors.primary[600] : colors.gray[50],
          tabBarInactiveTintColor:
            colorScheme === "light" ? colors.gray[500] : colors.primary[500],
          tabBarStyle: {
            backgroundColor:
              colorScheme === "light" ? colors.gray[50] : colors.primary[900],
            borderTopWidth: 0,
            height: 92,
            paddingTop: 16,
          },
          tabBarItemStyle: {
            borderRadius: 0,
          },
          tabBarButton: (props) => {
            return <TabsButton {...props} />
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: t("screens.home.title"),
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='transactions'
          options={{
            title: t("screens.transactions.title"),
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "card" : "card-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='scan'
          options={{
            title: t("screens.scan.title"),
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => ( 
              <View
                className={`${
                  focused
                    ? "bg-white dark:bg-primary-600 border-2 dark:border-0 border-primary-600"
                    : "bg-primary-600 dark:bg-primary-700"
                } w-16 h-16 rounded-full items-center justify-center -mt-16`}
              >
                <Ionicons
                  name='scan'
                  size={size}
                  color={focused ? color : "#fff"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='budget'
          options={{
            title: t("screens.budget.title"),
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='settings'
          options={{
            title: t("screens.settings.title"),
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
