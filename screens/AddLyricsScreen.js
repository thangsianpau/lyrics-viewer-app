import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddLyricsScreen = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const saveLyrics = async () => {
    if (!artist || !title || !lyrics) {
      Alert.alert('Missing Info', 'Please fill in artist, title, and lyrics.');
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'lyrics'), {
        artist,
        title,
        lyrics,
        createdAt: serverTimestamp(),
      });
      console.log('✅ Saved with ID:', docRef.id);
      Alert.alert('Success', 'Lyrics saved!');
      setArtist('');
      setTitle('');
      setLyrics('');
    } catch (error) {
      console.error('❌ Firestore Save Error:', error);
      Alert.alert('Error', 'Failed to save lyrics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Lyrics</Text>
      <TextInput placeholder="Artist" value={artist} onChangeText={setArtist} style={styles.input} />
      <TextInput placeholder="Song Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput
        placeholder="Lyrics"
        value={lyrics}
        onChangeText={setLyrics}
        multiline numberOfLines={8}
        style={[styles.input, styles.lyricsInput]}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Save Lyrics" onPress={saveLyrics} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#000' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },
  input: {
    borderColor: '#ccc', borderWidth: 1, padding: 12, marginBottom: 12,
    borderRadius: 8, color: '#fff', backgroundColor: '#222',
  },
  lyricsInput: { minHeight: 160, textAlignVertical: 'top' },
});

export default AddLyricsScreen;
