import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import MemoryGame from './components/memoryGame/Main';
import SnakeGame from './components/snakeGame/Main';
import TetrisGame from './components/tetrisGame/Main';
import Game2048 from './components/2048Game/Main';

function App() {
  return (
    <Router>
      <Route exact path="/memoryGame" render={() => <MemoryGame />} />
      <Route exact path="/snakeGame" render={() => <SnakeGame />} />
      <Route exact path="/tetrisGame" render={() => <TetrisGame />} />
      <Route exact path="/2048Game" render={() => <Game2048 />} />
    </Router>
  );
}

export default App;
