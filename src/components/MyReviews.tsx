import { View } from "react-native"
import { Review, User, UserWithReviews } from "../types"
import Text from "./Text"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/queries"

type MyReviewsProps = {
  user: User,
  reviews: Review[]
}

const MyReviews = () => {
  const {data} = useQuery<UserWithReviews>(GET_USER, {
    variables: { includeReviews: true }
  })

  console.log('data', data)

  return (
    <View>
      <Text>My reviews</Text>
    </View>
  )
}

export default MyReviews