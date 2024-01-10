import React from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { FlatList, View } from "react-native";

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <View>
      {/* <FlatList ListHeaderComponent={} /> */}
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;