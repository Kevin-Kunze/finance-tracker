import { CustomColors } from "@/assets/colors"
import TransactionGroupList, {
  TransactionGroupListProps,
} from "@/components/containers/TransactionGroupList"
import ScreenTitle from "@/components/tabs/ScreenTitle"
import useTransactionGroup from "@/db/queries/transactionGroup"
import { useTypedTranslation } from "@/language/useTypedTranslation"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type TransactionGroups = {
  date: Date
  groups: TransactionGroupListProps["groups"]
}[]

export default function TransactionsScreen() {
  const { t, i18n } = useTypedTranslation()

  const { getMany: getTransactionGroups } = useTransactionGroup()
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroups>(
    []
  )

  useFocusEffect(
    useCallback(() => {
      const fetchTransactionGroups = async () => {
        const transactionGroupsResult = await getTransactionGroups()
        setTransactionGroups(
          transactionGroupsResult.map((grouped) => ({
            date: new Date(grouped.date),
            groups: grouped.groups.map((group) => ({
              name: group.name!,
              amount: group.totalAmount!,
              color: group.categoryColor as CustomColors,
              emoji: group.categoryEmoji,
            })),
          }))
        )
      }

      fetchTransactionGroups()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  return (
    <SafeAreaView className='flex-1 bg-gray-100 dark:bg-primary-950'>
      <View className='mx-4'>
        <ScreenTitle title={t("screens.transactions.title")} />
        <ScrollView>
          {transactionGroups.map((grouped, index) => (
            <View key={index} className='gap-2'>
              <Text className='text-subtitle text-gray-950 dark:text-gray-100'>
                {i18n.language === "en"
                  ? grouped.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : grouped.date.toLocaleDateString("de-DE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </Text>
              <TransactionGroupList groups={grouped.groups} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
