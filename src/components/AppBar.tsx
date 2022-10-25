import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { AuthenticatedUser } from '../types';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { data } = useQuery<AuthenticatedUser>(GET_USER)
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient()

  const onSignOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }

  return (
    <Pressable>
      <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text color='appBarText' fontWeight='bold' fontSize='subheading'>
            Repositories
          </Text>
        </Link>
        {data && data.me ?
          <Pressable onPress={onSignOut}>
            <Text color='appBarText' fontWeight='bold' fontSize='subheading'>Sign out</Text>
          </Pressable>
        :
          <Link to='/signin'>
            <Text color='appBarText' fontWeight='bold' fontSize='subheading'>Sign in</Text>
          </Link>
        }
      </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;