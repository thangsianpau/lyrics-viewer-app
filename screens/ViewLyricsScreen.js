import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function ViewLyricsScreen({ route }) {
  const { lyric } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lyric.title}</Text>
      <Text style={styles.artist}>by {lyric.artist}</Text>
      <Text style={styles.lyrics}>{lyric.lyrics}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  lyrics: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: 'serif',
    textAlign: 'justify',
  },
});
