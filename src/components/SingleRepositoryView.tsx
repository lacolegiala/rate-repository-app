import { FlatList, StyleSheet, View } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";
import React from "react";
import ReviewItem from "./ReviewItem";

const SingleRepositoryView = () => {
  const { id } = useParams<{ id: string }>()
  const { repository, loading } = useRepository({id: id})
  const { reviews, reviewsLoading } = useReviews({id: id})

  if (loading || reviewsLoading) return null

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem header={item.node.user.username} review={item.node} repositoryView />}
        keyExtractor={(item) => item.node.id}
        ListHeaderComponent={() => <RepositoryItem item={repository} githubLink={repository.url} />}
      />
    </View>
  )
}

export default SingleRepositoryView
