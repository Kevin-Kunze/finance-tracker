import { colors } from "@/assets/colors"
import { useTypedTranslation } from "@/language/useTypedTranslation"
import { View, Text, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"

const screenWidth = Dimensions.get("window").width

type BalanceCardProps = {
  amount: string
  data?: number[]
}

const BalanceCard = (props: BalanceCardProps) => {
  const { t } = useTypedTranslation()

  const chartConfig = {
    backgroundGradientFrom: colors.gray[50],
    backgroundGradientTo: colors.gray[50],
    color: () => colors.primary[500],
    strokeWidth: 2,
    propsForDots: { r: "0" },
    propsForBackgroundLines: {
      stroke: "transparent",
    },
  }

  const data = [3500, 3000, 2800, 2900, 3161]

  return (
    <View className='bg-gray-50 rounded-2xl p-4'>
      <Text className='text-primary-700 text-base text-center mb-2'>
        {t("screens.home.currentBalance")}
      </Text>

      <View className={"items-center"}>
        <Text className='text-gray-950 text-title font-bold text-center'>
          {props.amount}
          <Text className='text-gray-950 text-title font-bold'>€</Text>
        </Text>
      </View>

      {data && (
        <View className='items-center'>
          <LineChart
            data={{
              labels: data.map((_, i) => `${i + 1}`),
              datasets: [{ data: data }],
            }}
            width={screenWidth * 0.85}
            height={80}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            chartConfig={chartConfig}
            bezier
            style={{
              backgroundColor: "white",
              borderRadius: 16,
            }}
          />
        </View>
      )}
    </View>
  )
}

export default BalanceCard
