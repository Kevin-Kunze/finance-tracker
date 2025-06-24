import { Pressable } from "react-native"
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"

export default function TabButton({ ...props }: BottomTabBarButtonProps) {
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
}
