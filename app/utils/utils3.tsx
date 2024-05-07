import { Dimensions } from 'react-native';

const COL = 14;
const ROW = 4;
export const MARGIN = 15;
export const SIZE = Dimensions.get('window').width / COL - MARGIN;

export const getPosition = index => {
  'worklet';
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE,
  };
};

export const getOrder = (x, y) => {
  'worklet';
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};
