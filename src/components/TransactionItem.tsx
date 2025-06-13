import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionItem({
  emoji,
  title,
  amount,
  onPress,
}: {
  emoji: string;
  title: string;
  amount: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md px-4 py-3 mb-2"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="rounded-xl w-10 h-10 bg-primary-200 items-center justify-center mr-4">
          <Text className="text-xl">{emoji}</Text>
        </View>
        <Text className="text-lg font-medium text-gray-800 dark:text-white">
          {title}
        </Text>
      </View>

      <Text className="text-md font-semibold text-primary-600 dark:text-primary-400">
        {amount}€
      </Text>
    </TouchableOpacity>
  );
}
