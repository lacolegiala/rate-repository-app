import { useQuery } from "@apollo/client"
import { GET_SINGLE_REPOSITORY } from "../graphql/queries"
import { Repository } from "../types"

type SingleRepositoryData = {
  repository: Repository
}

type Props = {
  id: string
}

const useRepository = (props: Props) => {
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: props.id },
    fetchPolicy: 'cache-and-network'
  })

  return { loading, error, repository: data?.repository }
}

export default useRepository