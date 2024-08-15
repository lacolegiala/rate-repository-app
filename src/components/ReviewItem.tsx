import { View, StyleSheet, Pressable } from "react-native";
import { Review } from "../types";
import Text from './Text'
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";

type Props = {
  header: string,
  review: Review,
  repositoryView: boolean
}

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
  header: {
    fontWeight: 'bold'
  },
  textContainer: {
    width: 350
  },
  text: {
    fontSize: 16
  }
})

const ReviewItem = (props: Props) => {
  const navigate = useNavigate();
  return (
    <View style={styles.card}>
      <View style={styles.ratingCircle}>
        <Text style={styles.rating}>{props.review.rating}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.header, styles.infoItem]}>{props.header}</Text>
        <Text color='textSecondary' style={styles.infoItem}>{new Date(props.review.createdAt).toLocaleDateString()}</Text>
        <View style={styles.textContainer}>
          <Text key={props.review.id} style={styles.text}>
            {props.review.text}
          </Text>
          <Button onPress={() => navigate(`/${props.review.repository.id}`)}>
            See repository
          </Button>
          <Button>Delete</Button>
        </View>
      </View>
    </View>
  )
};

export default ReviewItem
