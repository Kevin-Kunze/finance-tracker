import { Tabs } from "expo-router"
import TabsButton from "./TabsButton"
import { useColorScheme } from "nativewind"
import { colors as themeColor } from "@/assets/colors"
import { Ionicons } from "@expo/vector-icons"

type TabInfo = {
  title: string
  name: string
  activeIcon: keyof typeof Ionicons.glyphMap
  inactiveIcon: keyof typeof Ionicons.glyphMap
}

export default function SecondTabs({
  leftTab,
  rightTab,
}: {
  leftTab: TabInfo
  rightTab: TabInfo
}) {
  const { colorScheme } = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "light"
            ? themeColor.primary[600]
            : themeColor.gray[50],
        tabBarInactiveTintColor:
          colorScheme === "light"
            ? themeColor.gray[500]
            : themeColor.primary[600],
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          textAlignVertical: "center",
        },
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light" ? themeColor.primary[50] : "#28395c",
          borderTopWidth: 0,
          height: 48,
        },
        tabBarItemStyle: {
          height: 48,
        },
        tabBarLabelPosition: "beside-icon",
        tabBarButton: (props) => <TabsButton {...props} />,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={leftTab.name}
        options={{
          title: leftTab.title,
          tabBarLabel: leftTab.title,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? leftTab.activeIcon : leftTab.inactiveIcon}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={rightTab.name}
        options={{
          title: rightTab.title,
          tabBarLabel: rightTab.title,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? rightTab.activeIcon : rightTab.inactiveIcon}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
