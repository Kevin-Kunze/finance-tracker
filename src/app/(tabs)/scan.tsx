import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import useTransactions from "@/db/queries/transaction";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

export default function ScanScreen() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const { createTransaction, error, loading } = useTransactions();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isExpense, setIsExpense] = useState(true);

  const handleCreateTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert(t("invalidAmount"), t("pleaseEnterValidNumber"));
      return;
    }

    const numericAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const result = await createTransaction({
      amount: numericAmount,
      description: description.trim(),
    });

    if (result) {
      setAmount("");
      setDescription("");

      Alert.alert(t("success"), t("transactionCreatedSuccessfully"), [
        {
          text: t("viewTransactions"),
          onPress: () => router.push("/(tabs)/transactions"),
        },
        {
          text: t("addAnother"),
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark p-4">
          <Text className="text-xl font-bold text-primary-600 dark:text-primary-650 mb-4">
            {t("addNewTransaction")}
          </Text>

          <View className="flex-row mb-6 bg-gray-100 dark:bg-primary-650 rounded-lg">
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                isExpense
                  ? "bg-primary-600 dark:bg-primary-700"
                  : "bg-transparent"
              }`}
              onPress={() => setIsExpense(true)}
            >
              <Text
                className={`text-center ${
                  isExpense ? "text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {t("expense")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg ${
                !isExpense
                  ? "bg-primary-600 dark:bg-primary-700"
                  : "bg-transparent"
              }`}
              onPress={() => setIsExpense(false)}
            >
              <Text
                className={`text-center ${
                  !isExpense ? "text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {t("income")}
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-600 dark:text-gray-100 mb-2">
            {t("amount")}
          </Text>
          <View className="flex-row items-center relative mb-6">
            <TextInput
              className="bg-white rounded-lg p-3 border border-gray-200 flex-1"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor={
                colorScheme === "light" ? "#888" : "#626262"
              }
              autoFocus
            />
            <Text className="absolute right-5">€</Text>
          </View>

          <Text className="text-gray-600 dark:text-gray-100 mb-2">
            {t("description")}
          </Text>
          <TextInput
            className="bg-white rounded-lg p-3 border border-gray-200 mb-6"
            value={description}
            onChangeText={setDescription}
            placeholder={t("description")}
            cursorColor={colorScheme === "light" ? "#5071b3" : "#28395c"}
            placeholderTextColor={
              colorScheme === "light" ? "#888" : "#626262"
            }
          />

          <TouchableOpacity
            className={`py-4 rounded-lg ${
              loading
                ? "bg-gray-400 dark:bg-gray-600"
                : "bg-primary-600 dark:bg-primary-700"
            }`}
            onPress={handleCreateTransaction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold">
                {t("addTransaction")}
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text className="text-red-500 mt-4 text-center">
              {error.message}
            </Text>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
