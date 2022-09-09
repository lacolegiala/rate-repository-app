import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 16,
    paddingBottom: 16,
    backgroundColor: '#25292C',
    display: 'flex',
    flexDirection: 'row',
    opacity: 0.96
  }
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text color='appBarText' fontWeight='bold' fontSize='subheading'>
            Repositories
          </Text>
        </Link>
        <Link to='/signin'>
          <Text color='appBarText' fontWeight='bold' fontSize='subheading'>Sign in</Text>
        </Link>
      </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;