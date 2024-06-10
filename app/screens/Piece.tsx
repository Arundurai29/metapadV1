import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SoundHandler = () => {
  const soundRef = useRef(new Audio.Sound());

  useEffect(() => {
    // Load the sound file
    const loadSound = async () => {
      try {
        await soundRef.current.loadAsync(require('../../src/sound.mp3'));
      } catch (error) {
        console.log('Error loading sound: ', error);
      }
    };

    loadSound();

    return () => {
      // Unload the sound when the component unmounts
      soundRef.current.unloadAsync();
    };
  }, []);

  const onGestureEvent = (event) => {
    // Handle the gesture event if needed
  };

  const onHandlerStateChange = async (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      try {
        await soundRef.current.replayAsync();
      } catch (error) {
        console.log('Error playing sound: ', error);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={styles.container}>
          <Text>Pan me and hear a sound!</Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SoundHandler;
