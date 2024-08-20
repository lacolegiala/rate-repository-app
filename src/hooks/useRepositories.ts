import { ApolloError, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { SortOptions, RepoNode } from '../types';

type RepositoryData = {
  loading: boolean,
  error: ApolloError,
  repositories: RepoNode,
  fetchMore: () => void
}

type Props = {
  sortOptions: SortOptions,
  searchKeyword: string,
  first: number
}

const useRepositories = (props: Props): RepositoryData => {
  const { loading, error, data, fetchMore, ...result } = useQuery<RepositoryData>(GET_REPOSITORIES, {
    variables: { orderBy: props.sortOptions.orderBy, orderDirection: props.sortOptions.orderDirection, searchKeyword: props.searchKeyword},
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...props,
      },
    });
  };

  return { loading, error, repositories: data?.repositories, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;