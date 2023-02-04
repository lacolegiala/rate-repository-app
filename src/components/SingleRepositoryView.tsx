import { Pressable, View } from "react-native"
import { useParams } from "react-router-native"
import * as Linking from 'expo-linking';
import { Repository } from "../types"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository";

type Props = {
  gitHubLink: boolean
}

const SingleRepositoryView = (props: Props) => {
  const { id } = useParams<{ id: string }>()
  const repository = useRepository({id: id}).repository
  return (
    <View>
      <RepositoryItem item={repository}></RepositoryItem>
      <Pressable onPress={() => Linking.openURL(repository.url)}>
        {/* See in GitHub */}
      </Pressable>
    </View>
  )
}

export default SingleRepositoryView
