import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddLyricsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleAdd = () => {
    if (!title || !artist || !lyrics) {
      Alert.alert('Please fill all fields');
      return;
    }
    Alert.alert('Lyric saved (not permanent yet)');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Artist" style={styles.input} value={artist} onChangeText={setArtist} />
      <TextInput placeholder="Lyrics" style={styles.textarea} value={lyrics} onChangeText={setLyrics} multiline />
      <Button title="Add Lyrics" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize: 16
  },
  textarea: {
    borderWidth: 1,
    height: 150,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16
  }
});
