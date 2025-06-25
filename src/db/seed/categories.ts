import { DB_NAME } from "@/db/db_name"
import { categoryTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { createId } from "@paralleldrive/cuid2"
import { Category } from "../schemas/categories"

export async function seedCategories() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)

  await db.delete(categoryTable)

  const incomeId = createId()
  const housingId = createId()
  const utilitiesId = createId()
  const transportationId = createId()
  const foodId = createId()
  const entertainmentId = createId()
  const shoppingId = createId()
  const healthId = createId()
  const educationId = createId()
  const travelId = createId()
  const personalId = createId()

  const categories = [
    // Income Categories
    {
      id: incomeId,
      name: "Income",
      parentCategoryId: null,
      color: "green",
      icon: "💰",
    },
    {
      id: createId(),
      name: "Salary",
      parentCategoryId: incomeId,
      color: "green",
      icon: "💼",
    },
    {
      id: createId(),
      name: "Freelance",
      parentCategoryId: incomeId,
      color: "turquoise",
      icon: "💻",
    },
    {
      id: createId(),
      name: "Investments",
      parentCategoryId: incomeId,
      color: "blue",
      icon: "📈",
    },
    {
      id: createId(),
      name: "Side Hustle",
      parentCategoryId: incomeId,
      color: "orange",
      icon: "🚀",
    },
    {
      id: createId(),
      name: "Rental Income",
      parentCategoryId: incomeId,
      color: "violet",
      icon: "🏠",
    },

    // Housing Categories
    {
      id: housingId,
      name: "Housing",
      parentCategoryId: null,
      color: "blue",
      icon: "🏡",
    },
    {
      id: createId(),
      name: "Rent/Mortgage",
      parentCategoryId: housingId,
      color: "blue",
      icon: "🏠",
    },
    {
      id: utilitiesId,
      name: "Utilities",
      parentCategoryId: housingId,
      color: "yellow",
      icon: "⚡",
    },
    {
      id: createId(),
      name: "Electricity",
      parentCategoryId: utilitiesId,
      color: "yellow",
      icon: "💡",
    },
    {
      id: createId(),
      name: "Water",
      parentCategoryId: utilitiesId,
      color: "turquoise",
      icon: "💧",
    },
    {
      id: createId(),
      name: "Internet",
      parentCategoryId: utilitiesId,
      color: "violet",
      icon: "🌐",
    },
    {
      id: createId(),
      name: "Gas",
      parentCategoryId: utilitiesId,
      color: "orange",
      icon: "🔥",
    },
    {
      id: createId(),
      name: "Home Maintenance",
      parentCategoryId: housingId,
      color: "gray",
      icon: "🔧",
    },
    {
      id: createId(),
      name: "Home Insurance",
      parentCategoryId: housingId,
      color: "green",
      icon: "🛡️",
    },

    // Transportation Categories
    {
      id: transportationId,
      name: "Transportation",
      parentCategoryId: null,
      color: "orange",
      icon: "🚗",
    },
    {
      id: createId(),
      name: "Car Payment",
      parentCategoryId: transportationId,
      color: "orange",
      icon: "🚙",
    },
    {
      id: createId(),
      name: "Gas",
      parentCategoryId: transportationId,
      color: "yellow",
      icon: "⛽",
    },
    {
      id: createId(),
      name: "Car Insurance",
      parentCategoryId: transportationId,
      color: "blue",
      icon: "🛡️",
    },
    {
      id: createId(),
      name: "Car Maintenance",
      parentCategoryId: transportationId,
      color: "gray",
      icon: "🔧",
    },
    {
      id: createId(),
      name: "Public Transport",
      parentCategoryId: transportationId,
      color: "turquoise",
      icon: "🚌",
    },
    {
      id: createId(),
      name: "Parking",
      parentCategoryId: transportationId,
      color: "violet",
      icon: "🅿️",
    },

    // Food Categories
    {
      id: foodId,
      name: "Food & Dining",
      parentCategoryId: foodId,
      color: "pink",
      icon: "🍽️",
    },
    {
      id: createId(),
      name: "Groceries",
      parentCategoryId: foodId,
      color: "green",
      icon: "🛒",
    },
    {
      id: createId(),
      name: "Restaurants",
      parentCategoryId: foodId,
      color: "pink",
      icon: "🍕",
    },
    {
      id: createId(),
      name: "Fast Food",
      parentCategoryId: foodId,
      color: "orange",
      icon: "🍟",
    },
    {
      id: createId(),
      name: "Coffee",
      parentCategoryId: foodId,
      color: "yellow",
      icon: "☕",
    },
    {
      id: createId(),
      name: "Delivery",
      parentCategoryId: foodId,
      color: "turquoise",
      icon: "🚚",
    },

    // Entertainment Categories
    {
      id: entertainmentId,
      name: "Entertainment",
      parentCategoryId: null,
      color: "violet",
      icon: "🎭",
    },
    {
      id: createId(),
      name: "Streaming Services",
      parentCategoryId: entertainmentId,
      color: "violet",
      icon: "📺",
    },
    {
      id: createId(),
      name: "Movies",
      parentCategoryId: entertainmentId,
      color: "pink",
      icon: "🎬",
    },
    {
      id: createId(),
      name: "Gaming",
      parentCategoryId: entertainmentId,
      color: "blue",
      icon: "🎮",
    },
    {
      id: createId(),
      name: "Books",
      parentCategoryId: entertainmentId,
      color: "orange",
      icon: "📚",
    },
    {
      id: createId(),
      name: "Music",
      parentCategoryId: entertainmentId,
      color: "yellow",
      icon: "🎵",
    },
    {
      id: createId(),
      name: "Sports Events",
      parentCategoryId: entertainmentId,
      color: "green",
      icon: "⚽",
    },

    // Health & Fitness Categories
    {
      id: healthId,
      name: "Health & Fitness",
      parentCategoryId: null,
      color: "green",
      icon: "🏥",
    },
    {
      id: createId(),
      name: "Medical",
      parentCategoryId: healthId,
      color: "green",
      icon: "⚕️",
    },
    {
      id: createId(),
      name: "Dental",
      parentCategoryId: healthId,
      color: "turquoise",
      icon: "🦷",
    },
    {
      id: createId(),
      name: "Pharmacy",
      parentCategoryId: healthId,
      color: "pink",
      icon: "💊",
    },
    {
      id: createId(),
      name: "Gym Membership",
      parentCategoryId: healthId,
      color: "orange",
      icon: "💪",
    },
    {
      id: createId(),
      name: "Health Insurance",
      parentCategoryId: healthId,
      color: "blue",
      icon: "🛡️",
    },

    // Shopping Categories
    {
      id: createId(),
      name: shoppingId,
      parentCategoryId: null,
      color: "turquoise",
      icon: "🛍️",
    },
    {
      id: createId(),
      name: "Clothing",
      parentCategoryId: shoppingId,
      color: "pink",
      icon: "👕",
    },
    {
      id: createId(),
      name: "Electronics",
      parentCategoryId: shoppingId,
      color: "blue",
      icon: "📱",
    },
    {
      id: createId(),
      name: "Home Goods",
      parentCategoryId: shoppingId,
      color: "orange",
      icon: "🏠",
    },
    {
      id: createId(),
      name: "Personal Care",
      parentCategoryId: shoppingId,
      color: "violet",
      icon: "🧴",
    },
    {
      id: createId(),
      name: "Gifts",
      parentCategoryId: shoppingId,
      color: "yellow",
      icon: "🎁",
    },

    // Education Categories
    {
      id: educationId,
      name: "Education",
      parentCategoryId: null,
      color: "yellow",
      icon: "📚",
    },
    {
      id: createId(),
      name: "Tuition",
      parentCategoryId: educationId,
      color: "yellow",
      icon: "🎓",
    },
    {
      id: createId(),
      name: "Online Courses",
      parentCategoryId: educationId,
      color: "blue",
      icon: "💻",
    },
    {
      id: createId(),
      name: "School Supplies",
      parentCategoryId: educationId,
      color: "orange",
      icon: "✏️",
    },
    {
      id: createId(),
      name: "Certification",
      parentCategoryId: educationId,
      color: "green",
      icon: "📜",
    },

    // Travel Categories
    {
      id: travelId,
      name: "Travel",
      parentCategoryId: null,
      color: "turquoise",
      icon: "✈️",
    },
    {
      id: createId(),
      name: "Flights",
      parentCategoryId: travelId,
      color: "turquoise",
      icon: "✈️",
    },
    {
      id: createId(),
      name: "Hotels",
      parentCategoryId: travelId,
      color: "blue",
      icon: "🏨",
    },
    {
      id: createId(),
      name: "Car Rental",
      parentCategoryId: travelId,
      color: "orange",
      icon: "🚗",
    },
    {
      id: createId(),
      name: "Travel Insurance",
      parentCategoryId: travelId,
      color: "green",
      icon: "🛡️",
    },
    {
      id: createId(),
      name: "Activities",
      parentCategoryId: travelId,
      color: "pink",
      icon: "🎢",
    },

    // Personal Categories
    {
      id: personalId,
      name: "Personal",
      parentCategoryId: null,
      color: "gray",
      icon: "👤",
    },
    {
      id: createId(),
      name: "Haircuts",
      parentCategoryId: personalId,
      color: "violet",
      icon: "✂️",
    },
    {
      id: createId(),
      name: "Subscriptions",
      parentCategoryId: personalId,
      color: "gray",
      icon: "📰",
    },
    {
      id: createId(),
      name: "Donations",
      parentCategoryId: personalId,
      color: "green",
      icon: "❤️",
    },
    {
      id: createId(),
      name: "Pet Care",
      parentCategoryId: personalId,
      color: "yellow",
      icon: "🐕",
    },
  ] as Category[]

  await db.insert(categoryTable).values(categories)
}
