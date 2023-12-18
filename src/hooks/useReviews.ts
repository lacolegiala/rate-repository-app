import { ApolloError, useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { ReviewNode } from "../types";

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

  const reviews = data?.repository?.reviews?.edges || []

  return { reviewsLoading: loading, error, reviews }
}

export default useReviews