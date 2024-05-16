import React, { useState, useEffect } from 'react';
import './App.css';
const ops = ['+', '-', '*', '/', '%'];
const genNum = () => Math.floor(Math.random() * 90) + 10;
const genOp = () => ops[Math.floor(Math.random() * ops.length)];
const genQuestion = () => {
  const n1 = genNum();
  const n2 = genNum();
  const op = genOp();
  let ans;
  switch (op) {
    case '+':
      ans = n1 + n2;
      break;
    case '-':
      ans = n1 - n2;
      break;
    case '*':
      ans = n1 * n2;
      break;
    case '/':
      ans = parseFloat((n1 / n2).toFixed(2));
      break;
    case '%':
      ans = n1 % n2;
      break;
    default:
      break;
  }
  const opts = [ans];
  while (opts.length < 4) {
    const option = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 1) + ans;
    if (!opts.includes(option)) {
      opts.push(parseFloat(option.toFixed(2)));
    }
  }
  opts.sort(() => Math.random() - 0.5);
  return { n1, n2, op, ans, opts };
};
const Question = ({ q, time, onAns, qNum }) => {
  const [dispNum1, setDispNum1] = useState(genNum());
  const [dispNum2, setDispNum2] = useState(genNum());
  const [dispOp, setDispOp] = useState(genOp());
  const [selOpt, setSelOpt] = useState(null);
  useEffect(() => {
    let int1, int2, intOp, timeout;
    int1 = setInterval(() => setDispNum1(genNum()), 50);
    int2 = setInterval(() => setDispNum2(genNum()), 50);
    intOp = setInterval(() => setDispOp(genOp()), 50);
    timeout = setTimeout(() => {
      clearInterval(int1);
      clearInterval(int2);
      clearInterval(intOp);
      setDispNum1(q.n1);
      setDispNum2(q.n2);
      setDispOp(q.op);
    }, 1500);
    return () => {
      clearInterval(int1);
      clearInterval(int2);
      clearInterval(intOp);
      clearTimeout(timeout);
    };
  }, [q]);
  const handleOptionClick = (option) => {
    setSelOpt(option);
    setTimeout(() => onAns(option), 1000);
  };
  return (
    <div className="question">
      <div className="question-number">Question {qNum}/25</div>
      <div className="slot-machine">
        <div className="slot">{dispNum1}</div>
        <div className="slot">{dispOp}</div>
        <div className="slot">{dispNum2}</div>
      </div>
      <div className="options">
        {q.opts.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={selOpt === option ? (option === q.ans ? 'correct' : 'incorrect') : ''}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="timer">Time left: {time}s</div>
    </div>
  );
};
const Game = ({ playerName, onGameOver }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  useEffect(() => {
    const genQuestions = Array.from({ length: 25 }, genQuestion);
    setQuestions(genQuestions);
  }, []);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      nextQuestion(0);
    }
  }, [timeLeft, currentQuestion]);
  const nextQuestion = (points) => {
    setScore(score + points);
    if (currentQuestion < 24) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30 - currentQuestion * 1);
    } else {
      onGameOver(score + points);
    }
  };
  const handleAnswer = (option) => {
    if (questions[currentQuestion].ans === option) {
      nextQuestion(3);
    } else {
      nextQuestion(-1);
    }
  };
  return (
    <div className="game">
      {questions.length > 0 && (
        <Question
          q={questions[currentQuestion]}
          time={timeLeft}
          onAns={handleAnswer}
          qNum={currentQuestion + 1}
        />
      )}
      <div className="score">Score: {score}</div>
    </div>
  );
};
const WinScreen = ({ score, playerName, onRestart }) => {
  return (
    <div className="win-screen">
      <h1>Well Done, {playerName}!</h1>
      <p>You scored {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};
function App() {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const startGame = () => {
    if (playerName.trim() !== '') {
      setGameStarted(true);
      setGameOver(false);
      setFinalScore(0);
    }
  };
  const handleGameOver = (score) => {
    setGameOver(true);
    setGameStarted(false);
    setFinalScore(score);
  };
  const restartGame = () => {
    setPlayerName('');
    setGameStarted(false);
    setGameOver(false);
    setFinalScore(0);
  };
  return (
    <div className="App">
      {!gameStarted && !gameOver ? (
        <div className="start-screen">
          <h1><strong>Maths Number Puzzles</strong></h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame}>Start</button><br></br>
          For every Correct Answer <strong>+3 </strong>points are awarded<br></br>For Every Wrong Answer <strong>-1 </strong>points are awarded<br></br>For unattempted questions <strong>0 </strong>points are awarded.
        </div>
      ) : gameStarted ? (
        <Game playerName={playerName} onGameOver={handleGameOver} />
      ) : (
        <WinScreen score={finalScore} playerName={playerName} onRestart={restartGame} />
      )}
    </div>
  );
}

export default App;