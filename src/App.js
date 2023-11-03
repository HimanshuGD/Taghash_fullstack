import React from 'react';
import PollForm from './components/PollForm';
import Trend from './components/trend';
import { BrowserRouter as Switch, Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Bar from './components/bar';
import Navigation from './components/navigation';

function App() {
  return (
    <div className='App'>
      <Navigation/>
      <Bar/>
    </div>
  );
}

export default App;

