import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
function Home() {
  const [txt, setTxt] = useState('');
  const nav = useNavigate();
  const startAnim = () => {
    nav('/anim', { state: { txt } });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing Animation</h1>
        <textarea
          placeholder="Type something..."
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          rows="5"
          cols="40"
        />
        <button onClick={startAnim}>Start</button>
      </header>
    </div>
  );
}
function Anim() {
  const { state } = useLocation();
  const txt = state ? state.txt : '';
  const [dispTxt, setDispTxt] = useState('');
  const [idx, setIdx] = useState(0);
  const [cur, setCur] = useState(true);
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    if (animating && idx < txt.length) {
      const timeoutId = setTimeout(() => {
        setDispTxt((prev) => prev + txt[idx]);
        setIdx((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeoutId);
    } else if (idx === txt.length) {
      setAnimating(false);
      setCur(false);
    }
  }, [idx, animating, txt]);
  useEffect(() => {
    if (animating) {
      const interval = setInterval(() => {
        setCur((prevCur) => !prevCur);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [animating]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <div className="header-txt">
            <span>{dispTxt}</span>
            {cur && <span className="cur">|</span>}
          </div>
        </h1>
      </header>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anim" element={<Anim />} />
      </Routes>
    </Router>
  );
}
export default App;