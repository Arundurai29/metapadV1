import React, { Component } from 'react';
import { View, Image, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import Draggable from 'react-native-draggable';

const images = {
  ny_01: require('../../src/images/ny_01.jpg'),
  ny_02: require('../../src/images/ny_02.jpg'),
  ny_03: require('../../src/images/ny_03.jpg'),
  ny_04: require('../../src/images/ny_04.jpg'),
  ny_05: require('../../src/images/ny_05.jpg'),
  ny_06: require('../../src/images/ny_06.jpg'),
  ny_07: require('../../src/images/ny_07.jpg'),
  ny_08: require('../../src/images/ny_08.jpg'),
  ny_09: require('../../src/images/ny_09.jpg'),
};

const originalImage = require('../../src/images/ny_original.jpg');

class Jigsaw extends Component {
  state = {
    pieces: [],
    shuffled: [],
    solved: [],
    completed: false,
  };

  componentDidMount() {
    this.initializePuzzle();
  }

  initializePuzzle() {
    const pieces = [...Array(9)].map((_, i) => ({
      id: i,
      img: `ny_0${i + 1}`,
      order: i,
      board: 'shuffled',
    }));

    this.setState({
      pieces,
      shuffled: this.shufflePieces(pieces),
      solved: [...Array(9)],
      completed: false,
    });
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  handleDragStop = (pieceIndex, targetName) => (e, gesture) => {
    if (this.state.completed) return;

    const { pieces, shuffled, solved } = this.state;
    const piece = pieces.find((p) => p.id === pieceIndex);
    const board = [...this.state[targetName]];

    const dropZone =
      e.nativeEvent.pageX > 20 &&
      e.nativeEvent.pageX < 320 &&
      e.nativeEvent.pageY > 200 &&
      e.nativeEvent.pageY < 500;

    if (dropZone) {
      if (board.includes(piece)) {
        const index = board.indexOf(piece);
        board[index] = undefined;
      }

      const targetIndex =
        Math.floor((e.nativeEvent.pageX - 20) / 100) +
        Math.floor((e.nativeEvent.pageY - 200) / 100) * 3;
      board[targetIndex] = piece;

      const solvedPieces = board.filter((p) => p !== undefined);
      const isCompleted =
        solvedPieces.length === 9 &&
        solvedPieces.every((p, index) => p.id === index);

      this.setState({
        [targetName]: board,
        solved: isCompleted ? solvedPieces : solved,
        completed: isCompleted,
      });

      if (isCompleted) {
        Alert.alert('Congratulations!', 'You completed the puzzle!', [
          { text: 'OK', onPress: this.navigateToNextScreen },
        ]);
      }
    }
  };

  navigateToNextScreen = () => {
    // Navigate to the next screen here
    console.log('Navigate to next screen');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.originalImageContainer}>
          <Image source={originalImage} style={styles.originalImage} />
        </View>
        <View style={styles.board}>
          {this.state.shuffled.map((piece) => (
            <Draggable
              key={piece.id}
              onDragStop={this.handleDragStop(piece.id, 'shuffled')}
              x={0}
              y={0}
            >
              <Image source={images[piece.img]} style={styles.piece} />
            </Draggable>
          ))}
        </View>
        {this.state.completed && (
          <TouchableOpacity onPress={this.navigateToNextScreen}>
            <Text style={styles.winText}>You Win! Tap here to continue</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  originalImageContainer: {
    marginBottom: 20, // Adjust the margin as needed
  },
  originalImage: {
    width: 300,
    height: 300,
    opacity: 0.5,
    objectFit: 'contain',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  piece: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  winText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default Jigsaw;
