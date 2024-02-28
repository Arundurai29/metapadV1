import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Button, Text, Dimensions } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Draggable from 'react-native-draggable';

const windowWidth = Dimensions.get('window').width;
const puzzleSize = windowWidth - 40; // Adjust this value as needed
const pieceSize = puzzleSize / 3; // Adjust the number to determine the size of each puzzle piece

export default function App() {
  const [imageParts, setImageParts] = useState([]);
  const [shuffledParts, setShuffledParts] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    splitImage();
  }, []);

  const splitImage = async () => {
    const imageUri = 'https://schooloftechies.com/assets/img/compressjpeg/SUR03113-Enhanced-NR.jpg'; // Replace with your image URI
    const numRows = 3;
    const numCols = 3;

    const originalImage = { uri: imageUri };
    const imageInfo = await ImageManipulator.manipulateAsync(originalImage.uri, [{ resize: { width: puzzleSize } }]);

    const parts = [];
    const partWidth = imageInfo.width / numCols;
    const partHeight = imageInfo.height / numRows;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cropParameters = {
          originX: col * partWidth,
          originY: row * partHeight,
          width: partWidth,
          height: partHeight,
        };
        const croppedImage = await ImageManipulator.manipulateAsync(imageInfo.uri, [{ crop: cropParameters }]);
        parts.push({ ...croppedImage, position: { row, col } });
      }
    }

    setShuffledParts([...parts]);
    setImageParts([...parts]);
    setCompleted(false);
  };

  const shuffleParts = () => {
    setShuffledParts([...shuffledParts.sort(() => Math.random() - 0.5)]);
    setCompleted(false);
  };

  const onDragRelease = (event, gestureState, index) => {
    const newPositionX = Math.max(0, Math.min(puzzleSize - pieceSize, gestureState.moveX)); // Limit x within bounds
    const newPositionY = Math.max(0, Math.min(puzzleSize - pieceSize, gestureState.moveY)); // Limit y within bounds
    const newRow = Math.floor(newPositionY / (puzzleSize / 3));
    const newCol = Math.floor(newPositionX / (puzzleSize / 3));
    const newShuffledParts = [...shuffledParts];
    newShuffledParts[index].position = { row: newRow, col: newCol };
    setShuffledParts(newShuffledParts);

    if (isCompleted(newShuffledParts)) {
      setCompleted(true);
    }
  };

  const isCompleted = parts => {
    return parts.every((part, index) => {
      const { row, col } = part.position;
      return row === Math.floor(index / 3) && col === index % 3;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Jigsaw Puzzle</Text>
      </View>
      <View style={[styles.puzzleContainer, { width: puzzleSize, height: puzzleSize }]}>
        {shuffledParts.map((part, index) => (
          <Draggable
            key={index}
            x={part.position.col * (puzzleSize / 3)}
            y={part.position.row * (puzzleSize / 3)}
            minX={0}
            minY={0}
            maxX={puzzleSize - pieceSize}
            maxY={puzzleSize - pieceSize}
            onDragRelease={(event, gestureState) => onDragRelease(event, gestureState, index)}
          >
            <Image source={{ uri: part.uri }} style={styles.imagePart} />
          </Draggable>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Shuffle" onPress={shuffleParts} />
      </View>
      {completed && <Text style={styles.completedText}>Puzzle Completed!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  puzzleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    backgroundColor: '#fff', // Background color for the puzzle container
  },
  imagePart: {
    width: pieceSize,
    height: pieceSize,
    resizeMode: 'cover',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});
