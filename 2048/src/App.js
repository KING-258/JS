import React, { useState, useEffect } from 'react';
import './App.css';
function Tile({ value }) {
  let tileColor = value === 0 ? '#cdc1b4' : getTileColor(value);
  let textColor = value > 4 ? '#f9f6f2' : '#776e65';
  return (
    <div className="tile" style={{ background: tileColor, color: textColor }}>
      {value !== 0 && value}
    </div>
  );
}
function getTileColor(value) {
  switch (value) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc61';
    case 512:
      return '#edc850';
    case 1024:
      return '#edc53f';
    case 2048:
      return '#edc22e';
    default:
      return '#cdc1b4';
  }
}
function Board({ grid }) {
  return (
    <div className="board">
      {grid.map((r, ri) => (
        <div key={ri} className="row">
          {r.map((c, ci) => (
            <div key={ci} className="cell">
              <Tile value={c} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
function FrontPage({ onStartGame }) {
  const [s, setSize] = useState(4);
  const handleChange = (size) => {
    setSize(size);
  };
  const handleStart = () => {
    onStartGame(s);
  };
  return (
    <div className="front-page">
      <div className="title">2048</div>
      <div className="options">
        <div className="grid-size">
          Grid Size:
          <select value={s} onChange={(e) => handleChange(parseInt(e.target.value))}>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
          </select>
        </div>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}
function App() {

  const [started, setStarted] = useState(false);
  const [size, setSize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (started) {
      const newGrid = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
      addRandomTile(newGrid);
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  }, [started, size]);
  const addRandomTile = (grid) => {
    const empty = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          empty.push({ r: i, c: j });
        }
      }
    }
    if (empty.length === 0) return;
    const { r, c } = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  };
  const handleStart = (s) => {
    setSize(s);
    setStarted(true);
  };
  const handleKeyPress = (event) => {
    if (!started) return;
    switch (event.key) {
      case 'ArrowUp':
        moveUp();
        break;
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      default:
        break;
    }
  };
  const moveUp = () => {
    const newGrid = [...grid];
    let moved = false;
    for (let col = 0; col < size; col++) {
      for (let row = 1; row < size; row++) {
        if (newGrid[row][col] !== 0) {
          let newRow = row;
          while (newRow > 0 && (newGrid[newRow - 1][col] === 0 || newGrid[newRow - 1][col] === newGrid[row][col])) {
            if (newGrid[newRow - 1][col] === 0) {
              newGrid[newRow - 1][col] = newGrid[newRow][col];
              newGrid[newRow][col] = 0;
              newRow--;
              moved = true;
            } else if (newGrid[newRow - 1][col] === newGrid[row][col]) {
              newGrid[newRow - 1][col] *= 2;
              newGrid[newRow][col] = 0;
              setScore(score + newGrid[newRow - 1][col]);
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  };
  const moveDown = () => {
    const newGrid = [...grid];
    let moved = false;
    for (let col = 0; col < size; col++) {
      for (let row = size - 2; row >= 0; row--) {
        if (newGrid[row][col] !== 0) {
          let newRow = row;
          while (newRow < size - 1 && (newGrid[newRow + 1][col] === 0 || newGrid[newRow + 1][col] === newGrid[row][col])) {
            if (newGrid[newRow + 1][col] === 0) {
              newGrid[newRow + 1][col] = newGrid[newRow][col];
              newGrid[newRow][col] = 0;
              newRow++;
              moved = true;
            } else if (newGrid[newRow + 1][col] === newGrid[row][col]) {
              newGrid[newRow + 1][col] *= 2;
              newGrid[newRow][col] = 0;
              setScore(score + newGrid[newRow + 1][col]);
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  };
  const moveLeft = () => {
    const newGrid = [...grid];
    let moved = false;
    for (let row = 0; row < size; row++) {
      for (let col = 1; col < size; col++) {
        if (newGrid[row][col] !== 0) {
          let newCol = col;
          while (newCol > 0 && (newGrid[row][newCol - 1] === 0 || newGrid[row][newCol - 1] === newGrid[row][col])) {
            if (newGrid[row][newCol - 1] === 0) {
              newGrid[row][newCol - 1] = newGrid[row][newCol];
              newGrid[row][newCol] = 0;
              newCol--;
              moved = true;
            } else if (newGrid[row][newCol - 1] === newGrid[row][col]) {
              newGrid[row][newCol - 1] *= 2;
              newGrid[row][newCol] = 0;
              setScore(score + newGrid[row][newCol - 1]);
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  };
  const moveRight = () => {
    const newGrid = [...grid];
    let moved = false;
    for (let row = 0; row < size; row++) {
      for (let col = size - 2; col >= 0; col--) {
        if (newGrid[row][col] !== 0) {
          let newCol = col;
          while (newCol < size - 1 && (newGrid[row][newCol + 1] === 0 || newGrid[row][newCol + 1] === newGrid[row][col])) {
            if (newGrid[row][newCol + 1] === 0) {
              newGrid[row][newCol + 1] = newGrid[row][newCol];
              newGrid[row][newCol] = 0;
              newCol++;
              moved = true;
            } else if (newGrid[row][newCol + 1] === newGrid[row][col]) {
              newGrid[row][newCol + 1] *= 2;
              newGrid[row][newCol] = 0;
              setScore(score + newGrid[row][newCol + 1]);
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  };
  return (
    <div className="App" tabIndex="0" onKeyDown={handleKeyPress}>
      {!started ? (
        <FrontPage onStartGame={handleStart} />
      ) : (
        <div>
          <Board grid={grid} />
          <div>Score: {score}</div>
        </div>
      )}
    </div>
  );
}
export default App;