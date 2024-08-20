import { FlatList, View } from "react-native"
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

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];
  
  return (
    <View>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem header={item.user.username} review={item} repositoryView />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <RepositoryItem item={repository} githubLink={repository.url} />}
      />
    </View>
  )
}

export default SingleRepositoryView
