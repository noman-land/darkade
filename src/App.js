import React from 'react';

import './App.css';

const matrix = Array.from(Array(4096))
  .map(() => Number(Math.random() > 0.5))
  .reduce((accum, value, i) => {
    const tens = Math.floor(i / 64);
    const ones = i - tens * 64;
    if (accum[tens]) {
      accum[tens][ones] = value;
    } else {
      accum[tens] = [value];
    }
    return accum;
  }, []);

const App = () => (
  <div className="app">
    {matrix.map((y, i) => (
      <div className="row" key={i}>
        {y.map((x, j) => (
          <span className={`cell ${x ? 'on' : ''}`} key={`${i}${j}`}></span>
        ))}
      </div>
    ))}
  </div>
);

export default App;
