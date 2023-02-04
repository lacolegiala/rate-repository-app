import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

type RenderItemProps = {
  item: Repository
}

const RepositoryListContainer = ({ repositories }) => {
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
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};



export default RepositoryListContainer;