import { View } from "react-native"
import CategoryContainer, { CategoryContainerProps } from "./CategoryContainer"

type CategoryListProps = {
  categories: CategoryContainerProps[]
}

export default function CategoryList(props: CategoryListProps) {
  return (
    <View className='rounded-xl'>
      {props.categories.map((category, index) => (
        <CategoryContainer
          key={index}
          title={category.title}
          color={category.color}
          emoji={category.emoji}
        />
      ))}
    </View>
  )
}
