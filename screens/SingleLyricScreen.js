import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SingleLyricScreen({ route }) {
  const { lyric } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{lyric.title || '(Untitled)'}</Text>
      <Text style={styles.artist}>by {lyric.artist || 'Unknown Artist'}</Text>
      <Text style={styles.lyrics}>
        {(lyric.lyrics || '(No lyrics)').split('\n').map((line, i) => (
          <Text key={i}>{line}{'\n'}</Text>
        ))}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f5f2e7',
    flexGrow: 1,
    minHeight: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  artist: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  lyrics: {
    fontSize: 16,
    lineHeight: 26,
    color: '#222',
    marginTop: 10,
  },
});
