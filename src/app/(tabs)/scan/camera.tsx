import { GEMINI_API_KEY } from "@/api/GEMINI_API_KEY"

import { useTranslation } from "react-i18next"
import { TouchableOpacity, Dimensions, View, Text } from "react-native"
import { router } from "expo-router"
import { useState, useRef, useEffect } from "react"
import {
  CameraType,
  useCameraPermissions,
  CameraView,
  CameraCapturedPicture,
} from "expo-camera"
import { useIsFocused } from "@react-navigation/native"
import useCategory from "@/db/queries/category"

export default function CameraScreen() {
  const { t } = useTranslation()

  //db
  const { getManyAsJson: getCategoriesAsJson } = useCategory()

  // Camera variables
  const facing = "back" as CameraType
  const cameraRef = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()

  // View variables
  const isFocused = useIsFocused()
  const windowWidth = Dimensions.get("window").width
  const [isProcessing, changeState] = useState<boolean>(false)
  const [categories, setCategories] = useState<any>(null)

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true })
      askGemini(photo)
    }
  }

  // Load categories with retry mechanism
  useEffect(() => {
    const loadCategories = async () => {
      let retries = 5
      const retryDelay = 1000

      while (retries > 0) {
        try {
          const categoriesData = await getCategoriesAsJson()
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData)
            console.log("Categories loaded successfully")
            break
          } else {
            throw new Error("No categories returned")
          }
        } catch (error) {
          console.error(
            `Error loading categories (${retries} retries left):`,
            error
          )
          retries--

          if (retries === 0) {
            console.error("Failed to load categories after all retries")
          } else {
            await new Promise((resolve) => setTimeout(resolve, retryDelay))
          }
        }
      }
    }

    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function askGemini(photo: CameraCapturedPicture) {
    const apiKey = GEMINI_API_KEY
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    if (!categories) {
      console.error("Categories not loaded yet.")
      return
    }

    // Just for testing at the moment, needs data from database and refacotor
    const textInput =
      "You are given an image that contains a financial record – such as a receipt, invoice, payroll statement, or similar document. Your task is to extract all recognizable individual items or line entries (e.g. products, services, income types) and return them in structured JSON format.\n" +
      "\n" +
      "Each extracted item must be represented as a separate JSON object with the following fields:\n" +
      "\n" +
      "- name: The exact label as it appears in the image.\n" +
      "- term: A more general, standardized term derived from the name (e.g., \"Cappuccino Large\" → \"Coffee drink\", or \"Tax Advisor May 2024\" → \"Tax service\").\n" +
      "- amount: The monetary amount in Euros. Use a negative value for expenses (e.g., -12.49), and a positive value for all income, discounts, and refunds (e.g., 2500.00 or 0.50).\n" +
      "- categoryName: The name of the most specific matching category from the list provided below.\n" +
      "- categoryId: The ID of that specific category (only the final selected category, not the entire path).\n" +
      "\n" +
      "Classification Rules:\n" +
      "- Use only the category structure provided in the JSON below.\n" +
      "- Assign exactly one category to each item.\n" +
      "- Be creative and precise: select the most specific and appropriate category available in the tree – as deep as possible, without being speculative.\n" +
      "- Refunds and discounts count as income.\n" +
      "- In payslips: salaries, bonuses, and allowances are income; taxes, insurance, and deductions are expenses.\n" +
      "- If multiple subcategories match, choose the most relevant and descriptive one.\n" +
      "\n" +
      "Output format (JSON array):\n" +
      "[\n" +
      "  {\n" +
      "    \"name\": \"Original label from the image\",\n" +
      "    \"term\": \"Generalized product/service name\",\n" +
      "    \"amount\": -12.49,\n" +
      "    \"categoryName\": \"Coffee\",\n" +
      "    \"categoryId\": \"coffee123abc\"\n" +
      "  },\n" +
      "  ...\n" +
      "]\n" +
      "\n" +
      "Important:\n" +
      "- Only return categoryName and categoryId for the selected category, not the full hierarchy.\n" +
      "- Use only valid category IDs and names from the following tree:\n" +
      JSON.stringify(categories)

      console.log(JSON.stringify(categories))

      changeState(true)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: textInput },
                {
                  inlineData: {
                    mimeType: photo.base64
                      ? "image/jpeg"
                      : "application/octet-stream",
                    data: photo.base64,
                  },
                },
              ],
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData}`
        )
      }

      const data = await response.json()
      changeState(false)
      router.push({
        pathname: "/scan/input",
        params: { geminiResponse: data.candidates[0].content.parts[0].text },
      })
    } catch (error) {
      console.error("Error sending picture to Gemini API:", error)
    }

    changeState(false)
  }

  if (!permission?.granted) {
    requestPermission()
  }

  if (!permission?.granted) {
    // Check if camera permission is given
    // No camery permission given
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>{t("screens.camera.waiting_permission")}</Text>
      </View>
    )
  } else if (!isProcessing) {
    // Camera View
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        {isFocused ? (
          <View
            style={{ width: windowWidth, flex: 1, justifyContent: "center" }}
          >
            <CameraView facing={facing} style={{ flex: 1 }} ref={cameraRef} />
          </View>
        ) : null}

        <View
          style={{
            position: "absolute",
            bottom: 50 + (windowWidth / 4.5 - windowWidth / 3.8) / 2,
            left: windowWidth / 2 - windowWidth / 3.8 / 2,
            borderRadius: 90,
            opacity: 0.5,
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: 4.5,
            width: windowWidth / 3.8,
            height: windowWidth / 3.8,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            takePicture()
          }}
          style={{
            position: "absolute",
            bottom: 50,
            left: windowWidth / 2 - windowWidth / 4.5 / 2,
            borderRadius: 90,
            opacity: 0.4,
            backgroundColor: "white",
            width: windowWidth / 4.5,
            height: windowWidth / 4.5,
          }}
        />
      </View>
    )
  } // Process View
  else {
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        <Text>Processing...</Text>
      </View>
    )
  }
}
