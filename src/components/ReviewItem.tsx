import { View, StyleSheet, Alert } from "react-native";
import { Review, UserWithReviews } from "../types";
import Text from './Text';
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { ApolloQueryResult, OperationVariables, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

type Props = {
  header: string,
  review: Review,
  repositoryView: boolean,
  refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<UserWithReviews>>
};

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
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2A64CC',
    marginVertical: 12,
    marginHorizontal: 10
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#C54650',
    marginVertical: 12,
    marginHorizontal: 10
  }
});

const ReviewItem = (props: Props) => {
  const navigate = useNavigate();

  const [mutate] = useMutation<{ deleteReview: boolean }, { id: string }>(DELETE_REVIEW);

  const confirmation = (id: string) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const { data } = await mutate({ variables: { id } });
            if (data?.deleteReview) {
              props.refetch();
            } else {
              console.log('Failed to delete the review');
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.ratingCircle}>
        <Text style={styles.rating}>{props.review.rating}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.header, styles.infoItem]}>{props.header}</Text>
        <Text color='textSecondary' style={styles.infoItem}>
          {new Date(props.review.createdAt).toLocaleDateString()}
        </Text>
        <View style={styles.textContainer}>
          <Text key={props.review.id} style={styles.text}>
            {props.review.text}
          </Text>
          {!props.repositoryView && (
            <View style={styles.buttonContainer}>
              <Button style={styles.buttonView} onPress={() => navigate(`/${props.review.repository.id}`)}>
                <Text fontSize='regular' color='appBarText' fontWeight='bold'>
                  See repository
                </Text>
              </Button>
              <Button style={styles.buttonDelete} onPress={() => confirmation(props.review.id)}>
                <Text fontSize='regular' color='appBarText' fontWeight='bold'>
                  Delete
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
