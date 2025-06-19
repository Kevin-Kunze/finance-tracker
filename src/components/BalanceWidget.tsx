import { View, Text, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"

const screenWidth = Dimensions.get("window").width

const BalanceCard = ({
  amount = "3.161,45",
  label = "aktueller Kontostand",
  data = [3500, 3000, 2800, 2900, 3161],
}) => {
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: () => "#3B82F6",
    strokeWidth: 2,
    propsForDots: { r: "0" },
    propsForBackgroundLines: {
      stroke: "transparent",
    },
  }

  return (
    <View
      className="bg-white rounded-2xl mx-4 mt-4 px-4 pt-4 pb-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <Text className="text-blue-500 text-sm text-center mb-2">{label}</Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-black text-4xl font-extrabold">
            {amount}
            <Text className="text-black text-4xl font-bold">€</Text>
          </Text>
        </View>

        <LineChart
          data={{
            labels: data.map((_, i) => `${i + 1}`),
            datasets: [{ data }],
          }}
          width={screenWidth * 0.35}
          height={60}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          chartConfig={chartConfig}
          bezier
          style={{
            marginLeft: 8,
            paddingRight: 0,
            backgroundColor: "white",
          }}
        />
      </View>
    </View>
  )
}

export default BalanceCard
