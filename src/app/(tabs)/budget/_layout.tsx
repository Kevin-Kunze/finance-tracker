import SecondTabs from "@/components/SecondTabs"
import { useTranslation } from "react-i18next"

export default function BudgetLayout() {
  const { t } = useTranslation()

  return (
    <SecondTabs
      leftTab={{
        title: t("screens.budget.title"),
        name: "index",
        activeIcon: "caret-down-circle",
        inactiveIcon: "caret-down-circle-outline",
      }}
      rightTab={{
        title: t("screens.goals.title"),
        name: "goal",
        activeIcon: "flag",
        inactiveIcon: "flag-outline",
      }}
    />
  )
}
