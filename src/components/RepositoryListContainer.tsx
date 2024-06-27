import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper';

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

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
    
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
      ListHeaderComponent={
      <PaperProvider>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </PaperProvider>
      }
    >
    </FlatList>
  );
};



export default RepositoryListContainer;