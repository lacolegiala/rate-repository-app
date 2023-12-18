import { ApolloError, useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { Repository } from "../types";

type SingleRepositoryData = {
  loading: boolean,
  error: ApolloError,
  repository: Repository
}

type Props = {
  id: string
}

const useRepository = (props: Props): SingleRepositoryData => {
  console.log('ids', props.id)
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: props.id },
    fetchPolicy: 'cache-and-network'
  })

  const repository = data?.repository || null

  return { loading, error, repository: repository }
}

export default useRepository