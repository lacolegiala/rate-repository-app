import { ApolloError, useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { RepoNode, Repository, ReviewNode } from "../types";

type RepositoryReviews = {
  reviewsLoading: boolean,
  error: ApolloError,
  repository: Repository,
  reviews: ReviewNode,
  fetchMore: () => void
}

type Props = {
  id: string,
  first: number
}

const useReviews = (props: Props): RepositoryReviews => {
  const { loading, error, data, fetchMore, ...result } = useQuery<RepositoryReviews>(GET_REVIEWS, {
    variables: { id: props.id, first: props.first },
    fetchPolicy: 'cache-and-network'
  })

  const reviews: ReviewNode = data?.repository.reviews || null

  const handleFetchMore = () => {
    const canFetchMore = !loading && reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...props
      },
    });
  };

  return { reviewsLoading: loading, error, repository: data?.repository, reviews: reviews, fetchMore: handleFetchMore, ...result }
}

export default useReviews