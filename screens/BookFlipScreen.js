import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function BookFlipScreen() {
  const [lyrics, setLyrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      console.log('🔥 Lyrics from Firestore:', data);
      setLyrics(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#444" />
        <Text>Loading lyrics...</Text>
      </View>
    );
  }

  if (lyrics.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No lyrics found. Try adding some!</Text>
      </View>
    );
  }

  return (
    <PagerView style={styles.pager} initialPage={0}>
      {lyrics.map((item, index) => (
        <View key={index} style={styles.page}>
          <Text style={styles.title}>{item.Title || '(Untitled)'}</Text>
          <Text style={styles.artist}>by {item.Artist || 'Unknown Artist'}</Text>
          <Text style={styles.lyrics}>
            {(item.Lyrics || '(No lyrics)').split('\n').map((line, i) => (
              <Text key={i}>{line}{'\n'}</Text>
            ))}
          </Text>
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
    backgroundColor: '#f5f2e7'
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
    textAlign: 'left'
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f2e7'
  }
});
