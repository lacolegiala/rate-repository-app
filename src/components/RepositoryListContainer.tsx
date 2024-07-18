import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

type RenderItemProps = {
  item: Repository
}

const RepositoryListContainer = ({ repositories, sortOptions, setSortOptions }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
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
    setSortOptions(newSortOptions);
  };

  return (
    <FlatList
      ListHeaderComponent={
        <Picker
          selectedValue={sortOptions.orderBy === 'CREATED_AT' ? 'latest' : sortOptions.orderDirection === 'DESC' ? 'highest' : 'lowest'}
          onValueChange={(itemValue) => handleSortChange(itemValue)}
        >
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Highest rated" value="highest" />
          <Picker.Item label="Lowest rated" value="lowest" />
        </Picker>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryListContainer;
