import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const SoundButton = ({ title, soundPath, onPress, style, textStyle, children, disabled }) => {
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        soundPath,
        { shouldPlay: true }
      );
    } catch (error) {
      console.error('Failed to play sound', error);
    }
  };
  
  const handlePress = () => {
    if (onPress) {
      onPress(); // Call the original onPress event handler first
    }
    playSound(); // Then play the sound
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} disabled={disabled}>
    {children ? children : <Text style={textStyle}>{title}</Text>}
  </TouchableOpacity>
  );
};


export default SoundButton;
