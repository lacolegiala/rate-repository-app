import { View } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository";

const SingleRepositoryView = () => {
  const { id } = useParams<{ id: string }>()
  const { repository, loading } = useRepository({id: id})

  if (loading) return null

  return (
    <View>
      <RepositoryItem item={repository} githubLink={repository.url}></RepositoryItem>
    </View>
  )
}

export default SingleRepositoryView
