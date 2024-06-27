import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { View } from "react-native";
import { SortOptions } from "../types";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState<SortOptions>({orderBy: 'CREATED_AT', orderDirection: 'DESC'})

  const { repositories } = useRepositories({sortOptions: orderBy});

  return (
    <View>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;