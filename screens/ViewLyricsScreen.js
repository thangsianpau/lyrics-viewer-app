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
import { useNavigation } from '@react-navigation/native';

export default function ViewLyricsScreen() {
  const [lyricsList, setLyricsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  return (
    <FlatList
      data={lyricsList}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('SingleLyricScreen', {
              lyric: item,
            })
          }
        >
          <Text style={styles.itemText}>{index + 1}. {item.title}</Text>
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
