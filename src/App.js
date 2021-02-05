import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import TechList from './components/TechList';
import Login from './components/Login';
import Friends from './components/Friends';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Route path='/login' component={Login} />
    </div>
  );
}

export default App;
