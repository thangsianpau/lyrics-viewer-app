import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function BookFlipScreen() {
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setLyrics(data);
    });
    return unsubscribe;
  }, []);

  return (
    <PagerView style={styles.pager} initialPage={0}>
      {lyrics.map((item, index) => (
        <View key={index} style={styles.page}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>by {item.artist}</Text>
          <Text style={styles.lyrics}>{item.lyrics}</Text>
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1
  },
  page: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f2e7' // light parchment style
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif'
  },
  artist: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 26,
    whiteSpace: 'pre-line'
  }
});
