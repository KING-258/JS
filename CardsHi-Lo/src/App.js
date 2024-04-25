import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: '',
      nxt: '',
      res: '',
      over: true,
      hist: []
    };
  }

  start = () => {
    this.setState({
      cur: this.get(),
      nxt: this.get(),
      res: '',
      over: false,
      hist: []
    });
  };
  higher = () => {
    const next = this.get();
    const { nxt, cur, hist } = this.state;
    const res = this.val(next) >= this.val(cur) ? 'You guessed right! It was higher.' : 'You guessed wrong! It was not higher.';
    const histNew = [...hist, { current: cur, next: next, result: res }];
    this.setState({
      res,
      cur: next,
      nxt: this.get(),
      over: res.includes('wrong'),
      hist: histNew
    });
  };
  lower = () => {
    const next = this.get();
    const { nxt, cur, hist } = this.state;
    const res = this.val(next) <= this.val(cur) ? 'You guessed right! It was lower.' : 'You guessed wrong! It was not lower.';
    const histNew = [...hist, { current: cur, next: next, result: res }];
    this.setState({
      res,
      cur: next,
      nxt: this.get(),
      over: res.includes('wrong'),
      hist: histNew
    });
  };
  val = (card) => {
    const vals = { A: 1, J: 11, Q: 12, K: 13 };
    return vals[card] || parseInt(card);
  };
  get = () => {
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const idx = Math.floor(Math.random() * cards.length);
    return cards[idx];
  };
  render() {
    const { cur, nxt, res, over, hist } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>High-Low Card Game</h1>
          <div className="card-container">
            <div className="card">{cur}</div>
          </div>
          <div className="result">{res}</div>
          <div className="buttons">
            {over ? (
              <button onClick={this.start}>Start Game</button>
            ) : (
              <>
                <button onClick={this.higher}>Higher or Same</button>
                <button onClick={this.lower}>Lower or Same</button>
              </>
            )}
          </div>
          <div className="history">
            <h2>History</h2>
            <ul>
              {hist.map((item, index) => (
                <li key={index}>
                  {`Current Card: ${item.current}, Next Card: ${item.next}, Result: ${item.result}`}
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}
export default App;