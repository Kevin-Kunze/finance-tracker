import { Tabs, usePathname } from "expo-router"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, View } from "react-native"

export default function TabLayout() {
  const isScanActiveRoute = usePathname().includes("/scan")

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            height: 84,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={null} style={props.style} />
          ),
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='home' size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='transactions'
          options={{
            title: "Transactions",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='card' size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='scan'
          options={{
            title: "Scan",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <View
                className={`${
                  isScanActiveRoute ? "bg-secondary" : "bg-primary"
                } w-16 h-16 rounded-full items-center justify-center -mt-16`}
              >
                <Ionicons name='scan' size={size} color='#fff' />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='budget'
          options={{
            title: "Budget",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='wallet' size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='overview'
          options={{
            title: "Overview",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name='stats-chart' size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
