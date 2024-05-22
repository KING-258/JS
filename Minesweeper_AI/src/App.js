import React, { useState, useEffect, useRef } from 'react';
import './App.css';
const genEmptyGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array.from(Array(cols), () => ({
      isMine: false,
      revealed: false,
      neighborCount: 0
    })));
  }
  return grid;
}
const App = () => {
  const [size, setSize] = useState(null);
  const [grid, setGrid] = useState([]);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [bombs, setBombs] = useState(0);
  const [time, setTime] = useState(0);
  const [suggested, setSuggested] = useState(null);
  const [hints, setHints] = useState(3); 
  const timerRef = useRef(null);
  const selectSize = (size) => {
    setSize(size);
    setStarted(false); 
    setHints(3);
  };
  useEffect(() => {
    if (size) {
      const rows = size;
      const cols = size;
      const newGrid = genEmptyGrid(rows, cols);
      const mines = Math.floor(rows * cols * 0.15); 
      setBombs(mines);
      for (let i = 0; i < mines; i++) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        while (newGrid[r][c].isMine) {
          r = Math.floor(Math.random() * rows);
          c = Math.floor(Math.random() * cols);
        }
        newGrid[r][c].isMine = true;
        updateNeighbors(newGrid, r, c);
      }
      setGrid(newGrid);
    }
  }, [size]);
  useEffect(() => {
    if (started && !over) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [started, over]);
  const updateNeighbors = (grid, row, col) => {
    const dirs = [
      [1, 0], [1, 1], [0, 1], [-1, 1],
      [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];
    dirs.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        grid[newRow][newCol].neighborCount++;
      }
    });
  };
  const reveal = (row, col) => {
    if (over || grid[row][col].revealed) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[row][col].revealed = true;
    if (newGrid[row][col].isMine) {
      setOver(true);
    } else if (newGrid[row][col].neighborCount === 0) {
      revealEmpty(newGrid, row, col);
    }
    setGrid(newGrid);
    checkEnd(newGrid);
  };
  const revealEmpty = (grid, row, col) => {
    const dirs = [
      [1, 0], [1, 1], [0, 1], [-1, 1],
      [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];
    dirs.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        if (!grid[newRow][newCol].revealed) {
          grid[newRow][newCol].revealed = true;
          if (grid[newRow][newCol].neighborCount === 0) {
            revealEmpty(grid, newRow, newCol);
          }
        }
      }
    });
  };
  const checkEnd = (grid) => {
    const nonMines = size * size - bombs;
    let revealedCells = 0;
    grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isMine && cell.revealed) {
          revealedCells++;
        }
      });
    });
    if (revealedCells === nonMines) {
      setOver(true);
    }
  };
  const restart = () => {
    setOver(false);
    setTime(0);
    setStarted(false);
    setGrid([]);
    setSize(null);
    setHints(3);
  };
  const start = () => {
    setStarted(true);
  };
  const suggest = () => {
    if (hints > 0) {
      const shuffledCoords = shuffleCoords(size);
      for (const [row, col] of shuffledCoords) {
        if (!grid[row][col].revealed && !grid[row][col].isMine) {
          setSuggested({ row, col });
          setHints(prev => prev - 1);
          return;
        }
      }
    }
  };
  const shuffleCoords = (size) => {
    const coords = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        coords.push([i, j]);
      }
    }
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coords[i], coords[j]] = [coords[j], coords[i]];
    }
    return coords;
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
        className={`cell ${cell.revealed ? 'revealed' : ''} ${suggested && suggested.row === row && suggested.col === col ? 'suggested' : ''}`}
        onClick={() => reveal(row, col)}
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
      {size === null && (
        <div className="size-selection">
          <button onClick={() => selectSize(8)}>8x8</button>
          <button onClick={() => selectSize(12)}>12x12</button>
          <button onClick={() => selectSize(16)}>16x16</button>
        </div>
      )}
      {size && !started && (
        <button onClick={start}>Start</button>
      )}
      {size && started && (
        <>
          <div className="game-info">
            <div>Bombs: {bombs}</div>
            <div>Time: {formatTime(time)}</div>
            <div>Hints: {hints}</div>
            <button onClick={restart}>Restart</button>
            <button onClick={suggest} disabled={hints === 0}>Hint</button>
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
          {over && <h2>Game Over</h2>}
        </>
      )}
    </div>
  );
}
export default App;