import { Pressable, PressableProps } from "react-native"

export default function TabsButton(props: PressableProps) {
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
