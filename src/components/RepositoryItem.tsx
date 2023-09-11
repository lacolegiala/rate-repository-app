import React from 'react';
import { View, Image, StyleSheet, Linking, Pressable } from 'react-native';
import Text from '../components/Text'
import Stat from '../components/Stat'
import { Repository } from '../types';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingBottom: 12
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    margin: 6
  },
  upperInfo: {
    flexDirection: 'row',
    margin: 6
  },
  upperInfoItem: {
    padding: 4
  },
  upperInfoWrapper: {
    flex: 1
  },
  languageTag: {
    backgroundColor: '#0366d6',
    margin: 6,
    padding: 4,
    borderRadius: 4
  },
  languageText: {
    color: 'white',
    padding: 2
  },
  tagWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonWrapper: {
    alignItems: 'center'
  },
  githubButton: {
    borderRadius: 2,
    backgroundColor: '#0366d6',
    width: 360,
    padding: 10,
    margin: 12
  },
  buttonText: {
    color: 'white',
    padding: 2,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

type Props = {
  item: Repository,
  githubLink?: string
}

const RepositoryItem = (props: Props) => {

  return (
    <View testID='repositoryItem' style={styles.card}>
      <View style={styles.upperInfo}>
        <Image style={styles.image} source={{uri: props.item.ownerAvatarUrl}}></Image>
        <View style={styles.upperInfoWrapper}>
          <Text style={styles.upperInfoItem} fontWeight='bold'>
            {props.item.fullName}
          </Text>
          <Text style={styles.upperInfoItem} color='textSecondary'>
            {props.item.description}
          </Text>
          <View style={styles.tagWrapper}>
            <View style={styles.languageTag}>
              <Text style={styles.languageText}>
                {props.item.language}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Stat item={props.item}/>
      {props.githubLink && 
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.githubButton} onPress={() => Linking.openURL(props.githubLink)}>
            <Text style={styles.buttonText}>
              Open in GitHub
            </Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default RepositoryItem;
