import { Pressable, View } from "react-native"
import Text from '../components/Text'
import { useParams } from "react-router-native"
import * as Linking from 'expo-linking';
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository";

type Props = {
  gitHubLink: boolean
}

const SingleRepositoryView = (props: Props) => {
  const { id } = useParams<{ id: string }>()
  const { repository, loading } = useRepository({id: id})

  if (loading) return null

  console.log('repo', repository)
  console.log('url', repository.url)
  
  return (
    <View>
      <RepositoryItem item={repository}></RepositoryItem>
      <Pressable onPress={() => Linking.openURL(repository.url)}>
        <Text>
          See in GitHub
        </Text>
      </Pressable>
    </View>
  )
}

export default SingleRepositoryView
