import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function BookFlipScreen() {
  const [lyrics, setLyrics] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'lyrics'), orderBy('title'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => doc.data());
      console.log('🔥 Sorted lyrics:', data);
      setLyrics(data);
    });
    return () => unsubscribe();
  }, []);

  if (lyrics === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading lyrics...</Text>
      </View>
    );
  }

  if (lyrics.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No lyrics found. Add some to your library!</Text>
      </View>
    );
  }

  return (
    <PagerView style={styles.pager} initialPage={0}>
      {lyrics.map((item, i) => (
        <View key={i} style={styles.page}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>by {item.artist}</Text>
          <Text style={styles.lyrics}>{item.lyrics.trim()}</Text>
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: { flex: 1 },
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f2e7',
    justifyContent: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  artist: { fontSize: 18, fontStyle: 'italic', marginBottom: 12, textAlign: 'center' },
  lyrics: { fontSize: 16, lineHeight: 24, textAlign: 'left' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f2e7' },
  emptyText: { fontSize: 18, color: '#666' },
});
