import { Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText, ThemedView } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button title="📖 View Lyrics Book" onPress={() => router.push('/book')} />
        <Button title="➕ Add New Lyric" onPress={() => router.push('/add')} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  buttonContainer: {
    margin: 24,
    gap: 16,
  },
});
