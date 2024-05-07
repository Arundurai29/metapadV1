import {Dimensions} from 'react-native';

const COL = 12;
export const MARGIN = 0;
export const SIZE = 45;
export const SIZE2 =67;

export const getPosition = index => {
  'worklet';
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE2,
  };
};

export const getOrder = (x, y) => {
  'worklet';
  const row = Math.round(y / SIZE2);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};