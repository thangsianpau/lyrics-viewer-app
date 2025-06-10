import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddLyricsScreen = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const getLyrics = async (artist, title) => {
    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const data = await res.json();
      if (!data.lyrics) {
        throw new Error('Lyrics not found.');
      }
      return data.lyrics;
    } catch (err) {
      console.error('Fetch Error:', err);
      Alert.alert('Error', 'Lyrics not found. Check artist or title.');
      return null;
    }
  };

  const saveLyrics = async () => {
    if (!artist || !title) {
      Alert.alert('Missing Info', 'Please enter both artist and title.');
      return;
    }

    setLoading(true);
    const lyrics = await getLyrics(artist, title);

    if (!lyrics) {
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'lyrics'), {
        title,
        artist,
        lyrics,
        createdAt: new Date()
      });
      Alert.alert('Success', 'Lyrics saved!');
      setArtist('');
      setTitle('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save lyrics.');
      console.error('Firebase error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Lyrics</Text>
      <TextInput
        placeholder="Artist"
        placeholderTextColor="#888"
        value={artist}
        onChangeText={setArtist}
        style={styles.input}
      />
      <TextInput
        placeholder="Song Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Fetch & Save Lyrics" onPress={saveLyrics} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#000' // 🖤 background for dark mode
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff' // 🟡 visible in dark mode
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color: '#fff', // ⚪ input text color
    backgroundColor: '#222' // 🔳 input background for contrast
  },
});

export default AddLyricsScreen;
