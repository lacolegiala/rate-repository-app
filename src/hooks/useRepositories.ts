import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { RepoNode } from '../types';

type RepositoryData = {
  repositories: RepoNode
}

const useRepositories = () => {
  const { loading, error, data } = useQuery<RepositoryData>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  return { loading, error, repositories: data?.repositories };
};

export default useRepositories;