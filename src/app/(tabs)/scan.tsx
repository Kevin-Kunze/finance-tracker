import { View, Text } from "react-native";
import { useTypedTranslation } from "@/language/useTypedTranslation"; // Pfad ggf. anpassen

export default function ScanScreen() {
  const { t } = useTypedTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-primary-600 text-3xl">
        {t("screens.scan.title")}
      </Text>
    </View>
  );
}
