import { Text } from "react-native"

type FieldTitleProps = {
  title: string
}

export default function FieldTitle(props: FieldTitleProps) {
  return (
    <Text className='text-base font-semibold text-gray-950 dark:text-gray-100'>
      {props.title}
    </Text>
  )
}
