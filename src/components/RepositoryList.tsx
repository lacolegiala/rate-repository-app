import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { View } from "react-native";
import { SortOptions } from "../types";
import { Searchbar } from "react-native-paper";

const RepositoryList = () => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({orderBy: 'CREATED_AT', orderDirection: 'DESC'});
  const [searchQuery, setSearchQuery] = React.useState('');

  const { repositories } = useRepositories({sortOptions: sortOptions});

  return (
    <View>
      <Searchbar 
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <RepositoryListContainer 
        repositories={repositories}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
    </View>
  );
};

export default RepositoryList;
