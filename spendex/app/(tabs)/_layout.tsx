import { Tabs } from "expo-router"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { View, Pressable } from "react-native"
import { useColorScheme } from "nativewind"

export default function TabLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colorScheme === "light" ? "#5071b3" : "#fff",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#6b7280" : "#9ca3af",
          tabBarStyle: {
            backgroundColor: colorScheme === "light" ? "#fff" : "#28395c",
            borderTopWidth: 0,
            height: 92,
            paddingTop: 16,
          },
          tabBarItemStyle: {
            borderRadius: 0,
          },
          tabBarButton: (props) => {
            return (
              <Pressable
                onPress={props.onPress}
                onPressIn={props.onPressIn}
                onPressOut={props.onPressOut}
                android_ripple={null}
                android_disableSound={true}
                style={props.style}
              >
                {props.children}
              </Pressable>
            )
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
                  colorScheme === "light"
                    ? focused
                      ? "bg-white border-2 border-primary-600"
                      : "bg-primary-600"
                    : focused
                    ? "bg-gray-400"
                    : "bg-primary-650"
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
          name='overview'
          options={{
            title: "Overview",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='settings'
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </>
  )
}
