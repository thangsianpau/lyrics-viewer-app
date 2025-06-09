import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { lyricsList } from '../data/lyrics';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'lyrics'), (snapshot) => {
    const data = snapshot.docs.map(doc => doc.data());
    setLyrics(data);
  });

  return unsubscribe; // stop listening when screen unmounts
}, []);


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={lyricsList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ViewLyrics', { lyric: item })}>
            <Text style={styles.item}>{item.title} - {item.artist}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddLyrics')}>
        <Text style={styles.buttonText}>+ Add New Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { fontSize: 18, marginVertical: 10 },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
