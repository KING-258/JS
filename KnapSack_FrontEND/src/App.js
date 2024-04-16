import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [n, setN] = useState(0);
  const [items, setItems] = useState([]);
  const [c, setC] = useState(0);
  const [kType, setKType] = useState(0);
  const [maxV, setMaxV] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const calculate = () => {
    const requestData = {
      num_items: n,
      items: items,
      capacity: c,
      knapsack_type: kType
    };

    fetch('http://localhost:5000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      setMaxV(data.max_value);
      setSelectedItems(data.selected_items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const clear = () => {
    setN(0);
    setItems([]);
    setC(0);
    setKType(0);
    setMaxV(0);
    setSelectedItems([]);
  };

  return (
    <div className="container">
      <h1>Knapsack Problem Solver</h1>
      <div className="input-container">
        <label>Number of Items: </label>
        <input type="number" value={n} onChange={e => setN(parseInt(e.target.value))} />
      </div>
      <ItemsInput numItems={n} setItems={setItems} />
      <div className="input-container">
        <label>Capacity of Knapsack: </label>
        <input type="number" value={c} onChange={e => setC(parseInt(e.target.value))} />
      </div>
      <div className="input-container">
        <label>Knapsack Type: </label>
        <select value={kType} onChange={e => setKType(parseInt(e.target.value))}>
          <option value={0}>0/1 Knapsack</option>
          <option value={1}>Fractional Knapsack</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={calculate}>Calculate</button>
        <button onClick={clear}>Clear Result</button>
      </div>
      <div className="result-container">
        <h2>Results:</h2>
        <p>Maximum Value: {kType === 1 ? maxV.toFixed(2) : maxV}</p>
        <p>Selected Items:</p>
        {selectedItems.map((item, index) => (
          <div key={index}>
            <p className="item-info">Item Weight: {item[0]}</p>
            <p className="item-info">Item Profit: {item[1]}</p>
            {kType === 1 && <p className="item-info">Portion: {item[2]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemsInput({ numItems, setItems }) {
  const [weights, setWeights] = useState([]);
  const [profits, setProfits] = useState([]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    if (name === 'weight') {
      const newWeights = [...weights];
      newWeights[index] = value;
      setWeights(newWeights);
    } else if (name === 'profit') {
      const newProfits = [...profits];
      newProfits[index] = value;
      setProfits(newProfits);
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < numItems; i++) {
      inputs.push(
        <div key={i}>
          <label>Item {i + 1} Weight: </label>
          <input type="number" name="weight" value={weights[i] || ''} onChange={e => handleInputChange(i, e)} /><br />
          <label>Item {i + 1} Profit: </label>
          <input type="number" name="profit" value={profits[i] || ''} onChange={e => handleInputChange(i, e)} /><br />
        </div>
      );
    }
    return inputs;
  };

  useEffect(() => {
    const newItems = [];
    for (let i = 0; i < numItems; i++) {
      newItems.push([parseFloat(weights[i]) || 0, parseFloat(profits[i]) || 0]);
    }
    setItems(newItems);
  }, [weights, profits, numItems, setItems]);

  return (
    <div className="input-container">
      {renderInputs()}
    </div>
  );
}
export default App;