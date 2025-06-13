import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ViewLyricsScreen({ navigation }) {
  const [lyricsList, setLyricsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort alphabetically by title (case insensitive)
      data.sort((a, b) =>
        (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase())
      );
      setLyricsList(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading lyrics...</Text>
      </View>
    );
  }

  if (lyricsList.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No lyrics found. Try adding some!</Text>
      </View>
    );
  }

  // SHOW LIST OF TITLES. When pressed, show details in alert or navigate if you have a detail screen.
  return (
    <FlatList
      data={lyricsList}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            // If you have a dedicated detail screen, use navigation.navigate.
            // For now, just show alert.
            Alert.alert(
              item.title,
              `by ${item.artist}\n\n${item.lyrics}`
            );
          }}
        >
          <Text style={styles.itemText}>
            {index + 1}. {item.title || '(Untitled)'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
