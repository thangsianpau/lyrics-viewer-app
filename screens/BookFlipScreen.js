import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function BookFlipScreen() {
  const [lyrics, setLyrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PagerView, setPagerView] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
      const rawData = snapshot.docs.map((doc) => doc.data());

      // ✅ Safe sort with fallback to empty string if title is missing
      const sorted = rawData.sort((a, b) => {
        const titleA = (a.title || a.Title || '').toLowerCase();
        const titleB = (b.title || b.Title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      });

      console.log('✅ Sorted lyrics:', sorted);
      setLyrics(sorted);
      setLoading(false);
    });

    if (Platform.OS !== 'web') {
      import('react-native-pager-view').then((module) => {
        setPagerView(() => module.default);
      });
    }

    return () => unsubscribe();
  }, []);

  // ⛔ Web fallback
  if (Platform.OS === 'web') {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          Flip view is not supported on web. Please use a mobile device.
        </Text>
      </View>
    );
  }

  // ⏳ Loading spinner
  if (loading || !PagerView) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#444" />
        <Text>Loading lyrics...</Text>
      </View>
    );
  }

  // ❌ No lyrics
  if (lyrics.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No lyrics found. Try adding some!</Text>
      </View>
    );
  }

  // ✅ Show lyrics with flip pages
  return (
    <PagerView style={styles.pager} initialPage={0}>
      {lyrics.map((item, index) => (
        <View key={index} style={styles.page}>
          <Text style={styles.title}>{item.title || item.Title || '(Untitled)'}</Text>
          <Text style={styles.artist}>by {item.artist || item.Artist || 'Unknown Artist'}</Text>
          <Text style={styles.lyrics}>
            {(item.lyrics || item.Lyrics || '(No lyrics)').split('\n').map((line, i) => (
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
    flex: 1,
  },
  page: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f2e7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  artist: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'left',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f2e7',
  },
});
