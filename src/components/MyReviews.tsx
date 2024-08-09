import { FlatList, View, StyleSheet } from "react-native";
import { UserWithReviews } from "../types";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { loading, data } = useQuery<UserWithReviews>(GET_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return null;

  return (
    <View>
      {data?.me?.reviews?.edges && (
        <FlatList
          data={data.me.reviews.edges}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ReviewItem header={item.node.repository.fullName} review={item.node} repositoryView={false} />
          )}
          keyExtractor={(item) => item.node.id}
        />
      )}
    </View>
  );
};

export default MyReviews;
