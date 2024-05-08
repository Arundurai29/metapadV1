import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MARGIN, getOrder, getPosition } from '../utils/utils4-1';

const Draggable = ({ children, positions, id, gameStarted }) => {
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x);
      translateY.value = withTiming(newPosition.y);
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
          const newPositions = { ...positions.value };
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
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
      {gameStarted ? (
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View>{children}</Animated.View>
        </PanGestureHandler>
      ) : (
        <Animated.View>{children}</Animated.View>
      )}
    </Animated.View>
  );
};

export default Draggable;
