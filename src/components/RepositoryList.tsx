import React, { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { View } from "react-native";
import { SortOptions } from "../types";

const RepositoryList = () => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({orderBy: 'CREATED_AT', orderDirection: 'DESC'});
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const { repositories } = useRepositories({sortOptions: sortOptions, searchKeyword: searchKeyword});

  return (
    <View>
      <RepositoryListContainer 
        repositories={repositories}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    </View>
  );
};

export default RepositoryList;
