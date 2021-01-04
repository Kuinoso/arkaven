import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';import './App.css';
import Memory from './components/Memory';

function App() {
  return (
    <Router>
      <Route path="/" render={() => <Memory />} />
    </Router>
  );
}

export default App;
