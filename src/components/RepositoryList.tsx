import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { View } from "react-native";
import { SortOptions } from "../types";

const RepositoryList = () => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({orderBy: 'CREATED_AT', orderDirection: 'DESC'})

  const { repositories } = useRepositories({sortOptions: sortOptions});

  return (
    <View>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;