import React, { useState } from "react"
import { Platform, Pressable, Text, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Field from "./Field"
import FieldTitle from "./FieldTitle"

type DateInputProps = {
  title: string
  date: Date
  onChangeDate: (event: any, selectedDate?: Date) => void
}

export default function DateField(props: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false)
    }
    props.onChangeDate(event, selectedDate)
  }

  return (
    <View>
      <FieldTitle title={props.title} />

      <Pressable onPress={() => setShowPicker(true)}>
        <Field
          value={props.date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          disabled={true}
        />
      </Pressable>

      {showPicker && Platform.OS === "ios" && (
        <View className='bg-white rounded-xl mx-4 mt-2 p-3'>
          <DateTimePicker
            value={props.date}
            mode='date'
            display='inline'
            onChange={handleDateChange}
          />
          <Pressable
            onPress={() => setShowPicker(false)}
            className='bg-blue-500 rounded-lg p-3 mt-3'
          >
            <Text className='text-white text-center font-semibold'>Fertig</Text>
          </Pressable>
        </View>
      )}

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={props.date}
          mode='date'
          display='default'
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}
