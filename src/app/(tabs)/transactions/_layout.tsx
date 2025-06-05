import SecondTabs from "@/components/SecondTabs"

export default function TransactionLayout() {
  return (
    <SecondTabs
      leftTab={{
        title: "Transactions",
        name: "index",
        activeIcon: "list",
        inactiveIcon: "list-outline",
      }}
      rightTab={{
        title: "Bubbles",
        name: "bubble",
        activeIcon: "color-filter",
        inactiveIcon: "color-filter-outline",
      }}
    />
  )
}
