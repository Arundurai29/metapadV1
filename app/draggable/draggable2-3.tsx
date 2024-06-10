import React,{useEffect,useRef} from 'react';
import { Audio } from 'expo-av';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MARGIN, getOrder, getPosition } from '../utils/utils2-3';

const Draggable = ({ children, positions, id, gameStarted }) => {
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const isGestureActive = useSharedValue(false);
  const playSoundSignal = useSharedValue(false);

  const soundRef = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        const soundFile = require('../../src/suffle1.wav');
        await soundRef.current.loadAsync(soundFile);
      } catch (error) {
        console.error('Error loading sound:', error.message || error);
      }
    };

    loadSound();

    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const playSound = async () => {
      try {
        if (playSoundSignal.value) {
          await soundRef.current.replayAsync();
        }
      } catch (error) {
        console.error('Error playing sound:', error.message || error);
      }
    };

    if (playSoundSignal.value) {
      playSoundSignal.value = false; 
      playSound();
    }
  }, [playSoundSignal.value]);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPositions = getPosition(newOrder);
      translateX.value = withTiming(newPositions.x);
      translateY.value = withTiming(newPositions.y);
    },
  );

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }

      if (!playSoundSignal.value) {
        playSoundSignal.value = true; 
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      margin: MARGIN * 2,
      zIndex,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
    <PanGestureHandler enabled={gameStarted} onGestureEvent={panGesture}>
         <Animated.View>{children}</Animated.View>
       </PanGestureHandler>
   </Animated.View>
  );
};

export default Draggable;
