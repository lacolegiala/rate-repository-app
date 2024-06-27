import { ApolloError, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { SortOptions, RepoNode } from '../types';

type RepositoryData = {
  loading: boolean,
  error: ApolloError,
  repositories: RepoNode
}

type Props = {
  sortOptions: SortOptions
}

const useRepositories = (props: Props): RepositoryData => {
  const { loading, error, data } = useQuery<RepositoryData>(GET_REPOSITORIES, {
    variables: { orderBy: props.sortOptions.orderBy, orderDirection: props.sortOptions.orderDirection },
    fetchPolicy: 'cache-and-network'
  })

  return { loading, error, repositories: data?.repositories };
};

export default useRepositories;