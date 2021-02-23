import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, HashRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllUsers } from './redux/userReducer/actions';
import { getAllGames } from './redux/gameReducer/actions';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import NewPassword from './components/NewPassword';
import MemoryGame from './components/memoryGame/Main';
import SnakeGame from './components/snakeGame/Main';
import TetrisGame from './components/tetrisGame/Main';
import Game2048 from './components/2048Game/Main';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/allUsers')
      .then(res => {
        dispatch(getAllUsers(res.data));
      })
      .catch(err => console.log(err));

    axios.get('/api/allGames')
      .then(res => {
        dispatch(getAllGames(res.data))
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <HashRouter basename='/' >
      <Route path="/" render={() => <Navbar />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/profile/:name" render={() => <Profile />} />
      <Route exact path="/reset/:token" render={() => <NewPassword />} />
      <Route exact path="/memoryGame" render={() => <MemoryGame />} />
      <Route exact path="/snakeGame" render={() => <SnakeGame />} />
      <Route exact path="/tetrisGame" render={() => <TetrisGame />} />
      <Route exact path="/2048Game" render={() => <Game2048 />} />
      <Route path="/" render={() => <Footer />} />
    </HashRouter>
  );
}

export default App;
