import { ApolloError, useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { Review, ReviewNode } from "../types";

type RepositoryReviews = {
  reviewsLoading: boolean,
  error: ApolloError,
  reviews: ReviewNode[]
}

type Props = {
  id: string
}

const useReviews = (props: Props): RepositoryReviews => {
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id: props.id },
    fetchPolicy: 'cache-and-network'
  })

  return { reviewsLoading: loading, error, reviews: data?.repository.reviews.edges }
}

export default useReviews