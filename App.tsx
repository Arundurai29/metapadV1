import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import WordSearchPuzzle from './app/screens/word';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <WordSearchPuzzle />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
