import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';import './App.css';
import MemoryGame from './components/MemoryGame/Main';

function App() {
  return (
    <Router>
      <Route path="/" render={() => <MemoryGame />} />
    </Router>
  );
}

export default App;
