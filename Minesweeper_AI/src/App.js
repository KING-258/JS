import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const generateEmptyGrid = (numRows, numCols) => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => ({
      isMine: false,
      revealed: false,
      neighborCount: 0
    })));
  }
  return grid;
}

const App = () => {
  const [gridSize, setGridSize] = useState(null);
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [numBombs, setNumBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [suggestedCell, setSuggestedCell] = useState(null);
  const [suggestionsRemaining, setSuggestionsRemaining] = useState(3); 
  const timerRef = useRef(null);

  const handleGridSizeSelection = (size) => {
    setGridSize(size);
    setGameStarted(false); 
    setSuggestionsRemaining(3);
  };

  useEffect(() => {
    if (gridSize) {
      const numRows = gridSize;
      const numCols = gridSize;
      const newGrid = generateEmptyGrid(numRows, numCols);
      const numMines = Math.floor(numRows * numCols * 0.15); 
      setNumBombs(numMines);
      for (let i = 0; i < numMines; i++) {
        let randRow = Math.floor(Math.random() * numRows);
        let randCol = Math.floor(Math.random() * numCols);
        while (newGrid[randRow][randCol].isMine) {
          randRow = Math.floor(Math.random() * numRows);
          randCol = Math.floor(Math.random() * numCols);
        }
        newGrid[randRow][randCol].isMine = true;
        updateNeighborCounts(newGrid, randRow, randCol);
      }
      setGrid(newGrid);
    }
  }, [gridSize]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameOver]);

  const updateNeighborCounts = (grid, row, col) => {
    const directions = [
      [1, 0], [1, 1], [0, 1], [-1, 1],
      [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];
    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
        grid[newRow][newCol].neighborCount++;
      }
    });
  };

  const revealCell = (row, col) => {
    if (gameOver || grid[row][col].revealed) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].revealed = true;
    if (newGrid[row][col].isMine) {
      setGameOver(true);
    } else if (newGrid[row][col].neighborCount === 0) {
      revealEmptyCells(newGrid, row, col);
    }
    setGrid(newGrid);
  };

  const revealEmptyCells = (grid, row, col) => {
    const directions = [
      [1, 0], [1, 1], [0, 1], [-1, 1],
      [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];
    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
        if (!grid[newRow][newCol].revealed) {
          grid[newRow][newCol].revealed = true;
          if (grid[newRow][newCol].neighborCount === 0) {
            revealEmptyCells(grid, newRow, newCol);
          }
        }
      }
    });
  };

  const restartGame = () => {
    setGameOver(false);
    setTime(0);
    setGameStarted(false);
    setGrid([]);
    setGridSize(null);
    setSuggestionsRemaining(3);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const suggestMove = () => {
    if (suggestionsRemaining > 0) {
      const shuffledCoordinates = shuffleCoordinates(gridSize);
      for (const [row, col] of shuffledCoordinates) {
        if (!grid[row][col].revealed && !grid[row][col].isMine) {
          setSuggestedCell({ row, col });
          setSuggestionsRemaining(prev => prev - 1);
          return;
        }
      }
    }
  };

  const shuffleCoordinates = (gridSize) => {
    const coordinates = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        coordinates.push([i, j]);
      }
    }
    for (let i = coordinates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordinates[i], coordinates[j]] = [coordinates[j], coordinates[i]];
    }
    return coordinates;
  };

  const renderCell = (row, col) => {
    const cell = grid[row][col];
    let content = '';
    if (cell.revealed) {
      if (cell.isMine) {
        content = '💣';
      } else if (cell.neighborCount > 0) {
        content = cell.neighborCount;
      }
    }

    return (
      <div
        className={`cell ${cell.revealed ? 'revealed' : ''} ${suggestedCell && suggestedCell.row === row && suggestedCell.col === col ? 'suggested' : ''}`}
        onClick={() => revealCell(row, col)}
      >
        {content}
      </div>
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      {gridSize === null && (
        <div className="size-selection">
          <button onClick={() => handleGridSizeSelection(8)}>8x8</button>
          <button onClick={() => handleGridSizeSelection(12)}>12x12</button>
          <button onClick={() => handleGridSizeSelection(16)}>16x16</button>
        </div>
      )}
      {gridSize && !gameStarted && (
        <button onClick={startGame}>Start</button>
      )}
      {gridSize && gameStarted && (
        <>
          <div className="game-info">
            <div>Bombs: {numBombs}</div>
            <div>Time: {formatTime(time)}</div>
            <div>Suggestions Remaining: {suggestionsRemaining}</div> {}
            <button onClick={restartGame}>Restart</button>
            <button onClick={suggestMove} disabled={suggestionsRemaining === 0}>Suggest Move</button> {}
          </div>
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div key={colIndex}>
                    {renderCell(rowIndex, colIndex)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {gameOver && <h2>Game Over</h2>}
        </>
      )}
    </div>
  );
}

export default App;