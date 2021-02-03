import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import MemoryGame from './components/memoryGame/Main';
import SnakeGame from './components/snakeGame/Main';
import TetrisGame from './components/tetrisGame/Main';
import Game2048 from './components/2048Game/Main';
import ImageTest from './components/imageTest';

function App() {
  return (
    <Router>
      <Route path="/" render={() => <Navbar />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/memoryGame" render={() => <MemoryGame />} />
      <Route exact path="/snakeGame" render={() => <SnakeGame />} />
      <Route exact path="/tetrisGame" render={() => <TetrisGame />} />
      <Route exact path="/2048Game" render={() => <Game2048 />} />
      <Route exact path="/test" render={() => <ImageTest />} />
      <Route path="/" render={() => <Footer />} />
    </Router>
  );
}

export default App;
