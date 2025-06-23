import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTypedTranslation } from "@/language/useTypedTranslation"

export default function NewTransactionScreen() {
  const { t } = useTypedTranslation()

  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [items, setItems] = useState([
    {
      id: Date.now().toString(),
      icon: "help-circle-outline",
      label: t("screens.new.newItemLabel"),
      amount: "0.00"
    }
  ])

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      icon: "help-circle-outline",
      label: t("screens.new.newItemLabel"),
      amount: "0.00"
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: "label" | "amount", value: string) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )
    setItems(updated)
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSubmit = () => {
    setName("")
    setNote("")
    setDate(new Date())
    setItems([
      {
        id: Date.now().toString(),
        icon: "help-circle-outline",
        label: t("screens.new.newItemLabel"),
        amount: "0.00"
      }
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-primary-950 px-4 py-2">
      <Text className="text-lg font-bold text-black dark:text-white mb-4">
        {t("screens.new.title")}
      </Text>

      {/* Name */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 dark:text-gray-200 mb-1">
          {t("screens.new.name")}
        </Text>
        <TextInput
          className="bg-white dark:bg-gray-800 p-4 rounded-lg"
          placeholder={t("screens.new.namePlaceholder")}
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Datum */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 dark:text-gray-200 mb-1">
          {t("screens.new.date")}
        </Text>
        <TouchableOpacity
          className="bg-white dark:bg-gray-800 p-4 rounded-lg"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {date.toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false)
              if (selectedDate) setDate(selectedDate)
            }}
          />
        )}
      </View>

      {/* Notiz */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 dark:text-gray-200 mb-1">
          {t("screens.new.notes")}
        </Text>
        <TextInput
          className="bg-white dark:bg-gray-800 p-4 rounded-lg"
          placeholder={t("screens.new.notesPlaceholder")}
          placeholderTextColor="#999"
          value={note}
          onChangeText={setNote}
        />
      </View>

      {/* Positionen */}
      <Text className="text-sm text-gray-700 dark:text-gray-200 mb-2">
        {t("screens.new.details")}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-lg px-4 py-3 mb-2 justify-between gap-2">
            {/* Name */}
            <TextInput
              className="flex-1 text-black dark:text-white mr-2"
              placeholder={t("screens.new.itemLabel")}
              placeholderTextColor="#888"
              value={item.label}
              onChangeText={(text) => updateItem(item.id, "label", text)}
            />
            {/* Preis */}
            <TextInput
              keyboardType="decimal-pad"
              className="w-20 text-right text-black dark:text-white"
              placeholder="0.00"
              placeholderTextColor="#888"
              value={item.amount}
              onChangeText={(text) => updateItem(item.id, "amount", text)}
            />
            {/* Löschen */}
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Ionicons name="trash" size={20} color="#e11d48" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Hinzufügen */}
      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center py-2"
        onPress={handleAddItem}
      >
        <Ionicons name="add" size={16} />
        <Text className="ml-1">{t("screens.new.addItem")}</Text>
      </TouchableOpacity>

      {/* Speichern */}
      <TouchableOpacity
        className="bg-primary-600 p-4 mt-6 rounded-lg items-center"
        onPress={handleSubmit}
      >
        <Text className="text-white font-semibold">
          {t("screens.new.submit")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
