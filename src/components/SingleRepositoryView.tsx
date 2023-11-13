import { FlatList, StyleSheet, View } from "react-native"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";
import Text from './Text'
import { Review } from "../types";

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingBottom: 12,
    paddingRight: 4,
    marginTop: 8,
    flexDirection: 'row'
  },
  ratingCircle: {
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#0366d6',
    borderRadius: 50,
    height: 46,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 4
  },
  rating: {
    color: '#0366d6',
    fontWeight: 'bold'
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
    padding: 4,
  },
  infoItem: {
    marginBottom: 4
  },
  user: {
    fontWeight: 'bold'
  },
  textContainer: {
    width: 350
  },
  text: {
    fontSize: 16
  }
})

type Props = {
  review: Review
}

const ReviewItem = (props: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.ratingCircle}>
        <Text style={styles.rating}>{props.review.rating}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.user, styles.infoItem]}>{props.review.user.username}</Text>
        <Text color='textSecondary' style={styles.infoItem}>{new Date(props.review.createdAt).toLocaleDateString()}</Text>
        <View style={styles.textContainer}>
          <Text key={props.review.id} style={styles.text}>
            {props.review.text}
          </Text>
        </View>
      </View>
    </View>
  )
};

const SingleRepositoryView = () => {
  const { id } = useParams<{ id: string }>()
  const { repository, loading } = useRepository({id: id})
  const { reviews, reviewsLoading } = useReviews({id: id})

  if (loading || reviewsLoading) return null

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ node }) => node.id}
        ListHeaderComponent={() => <RepositoryItem item={repository} githubLink={repository.url} />}
      />
    </View>
  )
}

export default SingleRepositoryView
