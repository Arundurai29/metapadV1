import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

// Helper function to generate random letters for the grid
const generateRandomGrid = (size) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => alphabet.charAt(Math.floor(Math.random() * alphabet.length)))
    );
  return grid;
};

// Helper function to place words in the grid
const placeWordsInGrid = (grid, words) => {
  const newGrid = [...grid];
  words.forEach(({ word, start, direction }) => {
    for (let i = 0; i < word.length; i++) {
      let row = start.row;
      let col = start.col;
      if (direction === 'horizontal') {
        col += i;
      } else if (direction === 'vertical') {
        row += i;
      } else if (direction === 'diagonal-down-right') {
        row += i;
        col += i;
      } else if (direction === 'diagonal-up-right') {
        row -= i;
        col += i;
      }
      if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
        newGrid[row][col] = word[i];
      }
    }
  });
  return newGrid;
};

const WordSearchGame = () => {
  const gridSize = 10; // Adjusted grid size for the larger words
  const [grid, setGrid] = useState(generateRandomGrid(gridSize));
  const [words, setWords] = useState([
    { word: 'ACETYLCOA', start: { row: 0, col: 0 }, direction: 'horizontal' },
    { word: 'ETANICCUS', start: { row: 1, col: 1 }, direction: 'vertical' },
    { word: 'ETALAM', start: { row: 3, col: 0 }, direction: 'diagonal-down-right' },
    { word: 'FUMARATEC', start: { row: 5, col: 4 }, direction: 'diagonal-up-right' },
    { word: 'CITRATE', start: { row: 7, col: 2 }, direction: 'horizontal' },
    { word: 'SUCCINATE', start: { row: 2, col: 6 }, direction: 'vertical' },
    { word: 'ALFAKETOGLUTARATE', start: { row: 6, col: 8 }, direction: 'diagonal-down-right' },
    { word: 'MALATE', start: { row: 4, col: 1 }, direction: 'diagonal-up-right' },
    { word: 'ISOCIRATE', start: { row: 9, col: 0 }, direction: 'horizontal' },
    { word: 'OXALACETATE', start: { row: 3, col: 4 }, direction: 'vertical' }
  ]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [startCell, setStartCell] = useState(null);
  const [selectionDirection, setSelectionDirection] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Re-generate grid with placed words when words change
  useEffect(() => {
    const newGrid = placeWordsInGrid(generateRandomGrid(gridSize), words);
    setGrid(newGrid);
  }, [words]);

  // Handle start of drag (selecting a word)
  const handleDragStart = useCallback((event) => {
    const { x, y } = event.nativeEvent;
    const [row, col] = getCellCoordinates(x, y);

    if (row !== null && col !== null) {
      setStartCell({ row, col });
      setSelectedCells([{ row, col }]);
      setSelectionDirection(null); // Reset the direction on drag start
    }
  }, []);

  // Handle drag move (extend the selection)
  const handleDragMove = useCallback((event) => {
    const { x, y } = event.nativeEvent;
    const [row, col] = getCellCoordinates(x, y);

    if (row === null || col === null || startCell === null) return;

    const lastCell = selectedCells[selectedCells.length - 1];
    if (lastCell.row === row && lastCell.col === col) return;

    if (!selectionDirection) {
      const firstCell = selectedCells[0];
      if (row === firstCell.row) {
        setSelectionDirection('horizontal');
      } else if (col === firstCell.col) {
        setSelectionDirection('vertical');
      } else if (row - firstCell.row === col - firstCell.col) {
        setSelectionDirection('diagonal-down-right');
      } else if (row - firstCell.row === -(col - firstCell.col)) {
        setSelectionDirection('diagonal-up-right');
      }
    }

    // Check if the direction is still valid
    const isValidSelection =
      (selectionDirection === 'horizontal' && row === lastCell.row) ||
      (selectionDirection === 'vertical' && col === lastCell.col) ||
      (selectionDirection === 'diagonal-down-right' && row - lastCell.row === col - lastCell.col) ||
      (selectionDirection === 'diagonal-up-right' && row - lastCell.row === -(col - lastCell.col));

    if (isValidSelection) {
      setSelectedCells((prevSelection) => [...prevSelection, { row, col }]);
    }
  }, [selectedCells, selectionDirection, startCell]);

  // Handle end of drag (check for word completion)
  const handleDragEnd = useCallback(() => {
    checkForWordCompletion();
    setStartCell(null); // Reset the start cell after drag ends
  }, [selectedCells]);

  const checkForWordCompletion = () => {
    words.forEach((word) => {
      if (!completedWords.includes(word.word) && isWordComplete(word, selectedCells)) {
        setCompletedWords((prevWords) => [...prevWords, word.word]);
      }
    });

    setSelectedCells([]);
    if (completedWords.length + 1 === words.length) {
      setIsGameOver(true);
    }
  };

  // Check if a word is fully selected
  const isWordComplete = (word, selectedCells) => {
    const wordCells = getWordCells(word);
    return wordCells.every((cell) =>
      selectedCells.some((s) => s.row === cell.row && s.col === cell.col)
    );
  };

  // Get the coordinates of cells for a word based on its direction
  const getWordCells = (word) => {
    const { start, direction } = word;
    let cells = [];
    if (direction === 'horizontal') {
      for (let i = 0; i < word.word.length; i++) {
        cells.push({ row: start.row, col: start.col + i });
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < word.word.length; i++) {
        cells.push({ row: start.row + i, col: start.col });
      }
    } else if (direction === 'diagonal-down-right') {
      for (let i = 0; i < word.word.length; i++) {
        cells.push({ row: start.row + i, col: start.col + i });
      }
    } else if (direction === 'diagonal-up-right') {
      for (let i = 0; i < word.word.length; i++) {
        cells.push({ row: start.row - i, col: start.col + i });
      }
    }
    return cells;
  };

  // Get the grid coordinates based on touch position
  const getCellCoordinates = (x, y) => {
    const cellSize = 30; // Size of each cell in pixels
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    return row >= 0 && row < gridSize && col >= 0 && col < gridSize
      ? [row, col]
      : [null, null];
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Word Search Game</Text>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              const isSelected = selectedCells.some(
                (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex
              );
              return (
                <PanGestureHandler
                  key={`${rowIndex}-${colIndex}`}
                  onGestureEvent={handleDragMove}
                  onHandlerStateChange={handleDragEnd}
                >
                  <View
                    style={[
                      styles.cell,
                      isSelected && styles.selectedCell,
                      { width: 30, height: 30 },
                    ]}
                  >
                    <Text style={styles.cellText}>{grid[rowIndex][colIndex]}</Text>
                  </View>
                </PanGestureHandler>
              );
            })}
          </View>
        ))}
      </View>
      {isGameOver && <Text style={styles.gameOver}>Game Over! You found all words!</Text>}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCell: {
    backgroundColor: '#d3d3d3',
  },
  cellText: {
    fontSize: 16,
  },
  gameOver: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default WordSearchGame;
