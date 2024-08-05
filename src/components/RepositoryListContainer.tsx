import React, { useEffect, useMemo, useCallback } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { RepoNode, Repository, SortOptions } from '../types';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import debounce from "lodash.debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

type RenderItemProps = {
  item: Repository
}

type RepositoryListContainerProps = {
  repositories: RepoNode
  sortOptions: SortOptions,
  setSortOptions: React.Dispatch<React.SetStateAction<SortOptions>>,
  searchKeyword: string,
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>
}

const RepositoryListContainer = (props: RepositoryListContainerProps) => {
  const repositoryNodes = props.repositories
    ? props.repositories.edges.map(edge => edge.node)
    : [];
  
  const navigate = useNavigate();

  const renderItem = (props: RenderItemProps) => (
    <Pressable onPress={() => navigate(`/${props.item.id}`)}>
      <RepositoryItem item={props.item} />
    </Pressable>
  );

  const handleSortChange = (value: string) => {
    let newSortOptions;
    switch (value) {
      case 'highest':
        newSortOptions = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
        break;
      case 'lowest':
        newSortOptions = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
        break;
      default:
        newSortOptions = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
        break;
    }
    props.setSortOptions(newSortOptions);
  };

  const handleSearchChange = useCallback((value: string) => {
    props.setSearchKeyword(value);
  }, [props.setSearchKeyword]);

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 500);
  }, [handleSearchChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Searchbar 
          placeholder="Search"
          onChangeText={(text) => {
            debouncedResults(text); 
          }}
          value={props.searchKeyword}
        />
          <Picker
            selectedValue={props.sortOptions.orderBy === 'CREATED_AT' ? 'latest' : props.sortOptions.orderDirection === 'DESC' ? 'highest' : 'lowest'}
            onValueChange={(itemValue) => handleSortChange(itemValue)}
          >
            <Picker.Item label="Latest" value="latest" />
            <Picker.Item label="Highest rated" value="highest" />
            <Picker.Item label="Lowest rated" value="lowest" />
          </Picker>
        </View>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryListContainer;
