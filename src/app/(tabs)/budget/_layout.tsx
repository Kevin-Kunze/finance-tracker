import SecondTabs from "@/components/SecondTabs"

export default function BudgetLayout() {
  return (
    <SecondTabs
      leftTab={{
        title: "Budget",
        name: "index",
        activeIcon: "caret-down-circle",
        inactiveIcon: "caret-down-circle-outline",
      }}
      rightTab={{
        title: "Goals",
        name: "goal",
        activeIcon: "flag",
        inactiveIcon: "flag-outline",
      }}
    />
  )
}
