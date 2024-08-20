import React, { useEffect, useState, useCallback } from 'react';
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
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>,
  onEndReach: () => void
}

const RepositoryListContainer = (props: RepositoryListContainerProps) => {
  const [searchValue, setSearchValue] = useState(props.searchKeyword);

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

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      props.setSearchKeyword(query);
    }, 500),
    [props.setSearchKeyword]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Searchbar 
          placeholder="Search"
          onChangeText={(text) => {
            setSearchValue(text);
          }}
          value={searchValue}
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
      onEndReached={props.onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryListContainer;
