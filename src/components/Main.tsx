import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" element={<SingleRepositoryView />} />
        <Route path="/create" element={<CreateReview />} />
      </Routes>
    </View>
  );
};

export default Main;