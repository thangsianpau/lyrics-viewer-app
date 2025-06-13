import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

<Stack.Screen name="BookFlip" component={BookFlipScreen} />

import HomeScreen from './screens/HomeScreen';
import AddLyricsScreen from './screens/AddLyricsScreen';
import ViewLyricsScreen from './screens/ViewLyricsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddLyrics" component={AddLyricsScreen} />
        <Stack.Screen name="ViewLyrics" component={ViewLyricsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
