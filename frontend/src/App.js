import React from 'react';
import './App.css';
import NeoChart from './NeoChart';
import Apod from './Apod';

function App() {
return (
  <div className='App'>
    <h1>Astronomy Picture</h1>
      <Apod />
      <NeoChart />
  </div>
);

}

export default App;
