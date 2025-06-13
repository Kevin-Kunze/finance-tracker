import { SafeAreaView, ScrollView } from "react-native";
import TransactionItem from "../../../components/TransactionItem";

export default function TransactionsScreen() {
  const transactions = [
    { emoji: "⚽️", title: "Freizeitaktivitäten", amount: "300" },
    { emoji: "🛒", title: "Lebensmittel", amount: "300" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <ScrollView className='flex-1 px-4 py-2'>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            emoji={transaction.emoji}
            title={transaction.title}
            amount={transaction.amount}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
