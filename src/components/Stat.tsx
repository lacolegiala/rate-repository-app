import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Repository } from '../types';
import Text from './Text'

const styles = StyleSheet.create({
  statWrapper: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  stat: {
    alignItems: 'center'
  },
  statText: {
    marginTop: 4
  }
})

const formatNumber = (stat: number) => {
  if (stat < 1000) {
    return stat
  }
  else {
    return (stat / 1000).toFixed(1).concat('k')
  }
}

type Props = {
  item: Repository
}

const Stat = (props: Props) => {
  return (
    <View style={styles.statWrapper}>
    <View style={styles.stat}>
      <Text fontWeight='bold'>{formatNumber(props.item.stargazersCount)}</Text>
      <Text style={styles.statText} color='textSecondary'>Stars</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight='bold'>{formatNumber(props.item.forksCount)}</Text>
      <Text style={styles.statText} color='textSecondary'>Forks</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight='bold'>{formatNumber(props.item.reviewCount)}</Text>
      <Text style={styles.statText} color='textSecondary'>Reviews</Text>
    </View>
    <View style={styles.stat}>
      <Text fontWeight='bold'>{props.item.ratingAverage}</Text>
      <Text style={styles.statText} color='textSecondary'>Rating</Text>
    </View>
  </View>
  )
}

export default Stat