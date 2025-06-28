import { DB_NAME } from "@/db/db_name"
import { categoryTable } from "../schemas"
import { openDatabaseSync } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import { Category } from "../schemas/categories"

export async function seedCategories() {
  const sqliteDb = openDatabaseSync(DB_NAME)
  const db = drizzle(sqliteDb)

  const existingCategories = await db.select().from(categoryTable).limit(1)
  if (existingCategories.length > 0) {
    return false
  }

  const incomeId = 1
  const housingId = 10
  const utilitiesId = 20
  const transportationId = 30
  const foodId = 40
  const entertainmentId = 50
  const shoppingId = 60
  const healthId = 70
  const educationId = 80
  const travelId = 90
  const personalId = 100

  const categories = [
    // Income Categories
    {
      id: incomeId,
      name: "Income",
      parentCategoryId: null,
      color: "green",
      emoji: "💰",
    },
    {
      id: 2,
      name: "Salary",
      parentCategoryId: incomeId,
      color: "green",
      emoji: "💼",
    },
    {
      id: 3,
      name: "Freelance",
      parentCategoryId: incomeId,
      color: "turquoise",
      emoji: "💻",
    },
    {
      id: 4,
      name: "Investments",
      parentCategoryId: incomeId,
      color: "blue",
      emoji: "📈",
    },
    {
      id: 5,
      name: "Side Hustle",
      parentCategoryId: incomeId,
      color: "orange",
      emoji: "🚀",
    },
    {
      id: 6,
      name: "Rental Income",
      parentCategoryId: incomeId,
      color: "violet",
      emoji: "🏠",
    },

    // Housing Categories
    {
      id: housingId,
      name: "Housing",
      parentCategoryId: null,
      color: "blue",
      emoji: "🏡",
    },
    {
      id: 11,
      name: "Rent/Mortgage",
      parentCategoryId: housingId,
      color: "blue",
      emoji: "🏠",
    },
    {
      id: utilitiesId,
      name: "Utilities",
      parentCategoryId: housingId,
      color: "yellow",
      emoji: "⚡",
    },
    {
      id: 21,
      name: "Electricity",
      parentCategoryId: utilitiesId,
      color: "yellow",
      emoji: "💡",
    },
    {
      id: 22,
      name: "Water",
      parentCategoryId: utilitiesId,
      color: "turquoise",
      emoji: "💧",
    },
    {
      id: 23,
      name: "Internet",
      parentCategoryId: utilitiesId,
      color: "violet",
      emoji: "🌐",
    },
    {
      id: 24,
      name: "Gas",
      parentCategoryId: utilitiesId,
      color: "orange",
      emoji: "🔥",
    },
    {
      id: 12,
      name: "Home Maintenance",
      parentCategoryId: housingId,
      color: "gray",
      emoji: "🔧",
    },
    {
      id: 13,
      name: "Home Insurance",
      parentCategoryId: housingId,
      color: "green",
      emoji: "🛡️",
    },

    // Transportation Categories
    {
      id: transportationId,
      name: "Transportation",
      parentCategoryId: null,
      color: "orange",
      emoji: "🚗",
    },
    {
      id: 31,
      name: "Car Payment",
      parentCategoryId: transportationId,
      color: "orange",
      emoji: "🚙",
    },
    {
      id: 32,
      name: "Gas",
      parentCategoryId: transportationId,
      color: "yellow",
      emoji: "⛽",
    },
    {
      id: 33,
      name: "Car Insurance",
      parentCategoryId: transportationId,
      color: "blue",
      emoji: "🛡️",
    },
    {
      id: 34,
      name: "Car Maintenance",
      parentCategoryId: transportationId,
      color: "gray",
      emoji: "🔧",
    },
    {
      id: 35,
      name: "Public Transport",
      parentCategoryId: transportationId,
      color: "turquoise",
      emoji: "🚌",
    },
    {
      id: 36,
      name: "Parking",
      parentCategoryId: transportationId,
      color: "violet",
      emoji: "🅿️",
    },

    // Food Categories
    {
      id: foodId,
      name: "Food & Dining",
      parentCategoryId: null,
      color: "pink",
      emoji: "🍽️",
    },
    {
      id: 41,
      name: "Groceries",
      parentCategoryId: foodId,
      color: "green",
      emoji: "🛒",
    },
    {
      id: 42,
      name: "Restaurants",
      parentCategoryId: foodId,
      color: "pink",
      emoji: "🍕",
    },
    {
      id: 43,
      name: "Fast Food",
      parentCategoryId: foodId,
      color: "orange",
      emoji: "🍟",
    },
    {
      id: 44,
      name: "Coffee",
      parentCategoryId: foodId,
      color: "yellow",
      emoji: "☕",
    },
    {
      id: 45,
      name: "Delivery",
      parentCategoryId: foodId,
      color: "turquoise",
      emoji: "🚚",
    },

    // Entertainment Categories
    {
      id: entertainmentId,
      name: "Entertainment",
      parentCategoryId: null,
      color: "violet",
      emoji: "🎭",
    },
    {
      id: 51,
      name: "Streaming Services",
      parentCategoryId: entertainmentId,
      color: "violet",
      emoji: "📺",
    },
    {
      id: 52,
      name: "Movies",
      parentCategoryId: entertainmentId,
      color: "pink",
      emoji: "🎬",
    },
    {
      id: 53,
      name: "Gaming",
      parentCategoryId: entertainmentId,
      color: "blue",
      emoji: "🎮",
    },
    {
      id: 54,
      name: "Books",
      parentCategoryId: entertainmentId,
      color: "orange",
      emoji: "📚",
    },
    {
      id: 55,
      name: "Music",
      parentCategoryId: entertainmentId,
      color: "yellow",
      emoji: "🎵",
    },
    {
      id: 56,
      name: "Sports Events",
      parentCategoryId: entertainmentId,
      color: "green",
      emoji: "⚽",
    },

    // Health & Fitness Categories
    {
      id: healthId,
      name: "Health & Fitness",
      parentCategoryId: null,
      color: "green",
      emoji: "🏥",
    },
    {
      id: 71,
      name: "Medical",
      parentCategoryId: healthId,
      color: "green",
      emoji: "⚕️",
    },
    {
      id: 72,
      name: "Dental",
      parentCategoryId: healthId,
      color: "turquoise",
      emoji: "🦷",
    },
    {
      id: 73,
      name: "Pharmacy",
      parentCategoryId: healthId,
      color: "pink",
      emoji: "💊",
    },
    {
      id: 74,
      name: "Gym Membership",
      parentCategoryId: healthId,
      color: "orange",
      emoji: "💪",
    },
    {
      id: 75,
      name: "Health Insurance",
      parentCategoryId: healthId,
      color: "blue",
      emoji: "🛡️",
    },

    // Shopping Categories
    {
      id: shoppingId,
      name: "Shopping",
      parentCategoryId: null,
      color: "turquoise",
      emoji: "🛍️",
    },
    {
      id: 61,
      name: "Clothing",
      parentCategoryId: shoppingId,
      color: "pink",
      emoji: "👕",
    },
    {
      id: 62,
      name: "Electronics",
      parentCategoryId: shoppingId,
      color: "blue",
      emoji: "📱",
    },
    {
      id: 63,
      name: "Home Goods",
      parentCategoryId: shoppingId,
      color: "orange",
      emoji: "🏠",
    },
    {
      id: 64,
      name: "Personal Care",
      parentCategoryId: shoppingId,
      color: "violet",
      emoji: "🧴",
    },
    {
      id: 65,
      name: "Gifts",
      parentCategoryId: shoppingId,
      color: "yellow",
      emoji: "🎁",
    },

    // Education Categories
    {
      id: educationId,
      name: "Education",
      parentCategoryId: null,
      color: "yellow",
      emoji: "📚",
    },
    {
      id: 81,
      name: "Tuition",
      parentCategoryId: educationId,
      color: "yellow",
      emoji: "🎓",
    },
    {
      id: 82,
      name: "Online Courses",
      parentCategoryId: educationId,
      color: "blue",
      emoji: "💻",
    },
    {
      id: 83,
      name: "School Supplies",
      parentCategoryId: educationId,
      color: "orange",
      emoji: "✏️",
    },
    {
      id: 84,
      name: "Certification",
      parentCategoryId: educationId,
      color: "green",
      emoji: "📜",
    },

    // Travel Categories
    {
      id: travelId,
      name: "Travel",
      parentCategoryId: null,
      color: "turquoise",
      emoji: "✈️",
    },
    {
      id: 91,
      name: "Flights",
      parentCategoryId: travelId,
      color: "turquoise",
      emoji: "✈️",
    },
    {
      id: 92,
      name: "Hotels",
      parentCategoryId: travelId,
      color: "blue",
      emoji: "🏨",
    },
    {
      id: 93,
      name: "Car Rental",
      parentCategoryId: travelId,
      color: "orange",
      emoji: "🚗",
    },
    {
      id: 94,
      name: "Travel Insurance",
      parentCategoryId: travelId,
      color: "green",
      emoji: "🛡️",
    },
    {
      id: 95,
      name: "Activities",
      parentCategoryId: travelId,
      color: "pink",
      emoji: "🎢",
    },

    // Personal Categories
    {
      id: personalId,
      name: "Personal",
      parentCategoryId: null,
      color: "gray",
      emoji: "👤",
    },
    {
      id: 101,
      name: "Haircuts",
      parentCategoryId: personalId,
      color: "violet",
      emoji: "✂️",
    },
    {
      id: 102,
      name: "Subscriptions",
      parentCategoryId: personalId,
      color: "gray",
      emoji: "📰",
    },
    {
      id: 103,
      name: "Donations",
      parentCategoryId: personalId,
      color: "green",
      emoji: "❤️",
    },
    {
      id: 104,
      name: "Pet Care",
      parentCategoryId: personalId,
      color: "yellow",
      emoji: "🐕",
    },
  ] as Category[]

  await db.insert(categoryTable).values(categories)
  return true
}
