import React, { useState } from 'react';
import './App.css';
function App() {
  const [numItems, setNumItems] = useState(0);
  const [items, setItems] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [knapsackType, setKnapsackType] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCalculate = () => {
    const requestData = {
      num_items: numItems,
      items: items,
      capacity: capacity,
      knapsack_type: knapsackType
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
      setMaxValue(data.max_value);
      setSelectedItems(data.selected_items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleClear = () => {
    setNumItems(0);
    setItems([]);
    setCapacity(0);
    setKnapsackType(0);
    setMaxValue(0);
    setSelectedItems([]);
  };

  return (
    <div className="container">
      <h1>Knapsack Problem Solver</h1>
      <div className="input-container">
        <label>Number of Items: </label>
        <input type="number" value={numItems} onChange={e => setNumItems(parseInt(e.target.value))} />
      </div>
      <ItemsInput numItems={numItems} setItems={setItems} />
      <div className="input-container">
        <label>Capacity of Knapsack: </label>
        <input type="number" value={capacity} onChange={e => setCapacity(parseInt(e.target.value))} />
      </div>
      <div className="input-container">
        <label>Knapsack Type: </label>
        <select value={knapsackType} onChange={e => setKnapsackType(parseInt(e.target.value))}>
          <option value={0}>0/1 Knapsack</option>
          <option value={1}>Fractional Knapsack</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleClear}>Clear Result</button>
      </div>
      <div className="result-container">
        <h2>Results:</h2>
        <p>Maximum Value: {knapsackType === 1 ? maxValue.toFixed(2) : maxValue}</p>
        <p>Selected Items:</p>
        {selectedItems.map((item, index) => (
          <div key={index}>
            <p className="item-info">Item Weight: {item[0]}</p>
            <p className="item-info">Item Profit: {item[1]}</p>
            {knapsackType === 1 && <p className="item-info">Portion: {item[2]}</p>}
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

  React.useEffect(() => {
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