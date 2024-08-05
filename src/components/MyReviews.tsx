import { View } from "react-native"
import { Review, User } from "../types"
import Text from "./Text"

type MyReviewsProps = {
  user: User,
  reviews: Review[]
}

const MyReviews = () => {
  return (
    <View>
      <Text>My reviews</Text>
    </View>
  )
}

export default MyReviews