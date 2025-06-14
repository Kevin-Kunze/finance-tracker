import { Pressable, PressableProps } from "react-native"
import { useRouter, useSegments } from "expo-router"

type RouteNames = "budget" | "settings" | "transactions" | "home" | "scan"

type TabButtonProps = PressableProps & {
  isFocused?: boolean
  routeName?: RouteNames
}

export default function TabButton({
  isFocused,
  routeName,
  ...props
}: TabButtonProps) {
  const router = useRouter()
  const segments = useSegments()

  const handlePress = (event: any) => {
    if (isFocused && routeName) {
      const currentRoute = segments[segments.length - 1]
      if (currentRoute !== routeName) {
        router.push(`/${routeName}`)
      }
    }

    props.onPress?.(event)
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      android_ripple={null}
      android_disableSound={true}
      style={props.style}
    >
      {props.children}
    </Pressable>
  )
}
