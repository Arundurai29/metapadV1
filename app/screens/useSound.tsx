import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = (soundFile) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        if (isMounted) {
          setSound(sound);
        }
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundFile]);

  const playSound = async () => {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    }
  };

  return playSound;
};
