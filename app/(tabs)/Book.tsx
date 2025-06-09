import { Stack } from 'expo-router';
import BookFlipScreen from '../../screens/BookFlipScreen';

export default function BookTab() {
  return (
    <>
      <Stack.Screen options={{ title: 'Lyrics Book' }} />
      <BookFlipScreen />
    </>
  );
}
