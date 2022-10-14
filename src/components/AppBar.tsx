import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { AuthenticatedUser } from '../types';

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
  const { data } = useQuery<AuthenticatedUser>(GET_USER, {
    fetchPolicy: 'cache-and-network'
  })
  console.log('dataaaaa', data)

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
          {data && data.username ? <Text color='appBarText' fontWeight='bold' fontSize='subheading'>Sign out</Text>
          : <Text color='appBarText' fontWeight='bold' fontSize='subheading'>Sign in</Text>}
        </Link>
      </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;