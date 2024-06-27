import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

type RenderItemProps = {
  item: Repository
}

const RepositoryListContainer = ({ repositories }) => {
  const [selectedSortOption, setSelectedSortOption] = useState();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const navigate = useNavigate()

  const renderItem = (props: RenderItemProps) => {
  
    return (
      <Pressable onPress={() => navigate(`/${props.item.id}`)}>
        <RepositoryItem item={props.item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <Picker
          selectedValue={selectedSortOption}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSortOption(itemValue)
          }>
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Highest rated" value="highest" />
          <Picker.Item label="Lowest rated" value="lowest" />
        </Picker>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    >
    </FlatList>
  );
};



export default RepositoryListContainer;