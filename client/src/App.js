import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';import './App.css';
import MemoryGame from './components/memoryGame/Main';
import SnakeGame from './components/snakeGame/Main'

function App() {
  return (
    <Router>
      <Route exact path="/memoryGame" render={() => <MemoryGame />} />
      <Route exact path="/snakeGame" render={() => <SnakeGame />} />
    </Router>
  );
}

export default App;
