import React from 'react';
import AirconCalulator from './components/airconCalculator/AirconCalculator';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://youtube.com/c/mattkander"
          target="_blank"
          rel="noopener noreferrer"
        >
          LIKE AND SUBSCRIBE
        </a>
      </header>
      <AirconCalulator />
    </div>
  );
}

export default App;
