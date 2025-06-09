import { Tabs } from "expo-router"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { useColorScheme } from "nativewind"
import TabsButton from "@/components/TabsButton"
import { colors } from "@/assets/colors"

export default function TabLayout() {
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
            title: "Home",
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
            title: "Transactions",
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
            title: "Scan",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <View
                className={`${
                  focused
                    ? "bg-white dark:bg-primary-600 border-2 border-primary-600 dark:border-primary-800"
                    : "bg-primary-600 dark:bg-primary-800"
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
            title: "Budget",
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
            title: "Settings",
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
