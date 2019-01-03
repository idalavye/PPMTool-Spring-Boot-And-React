import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './component/Dashboard';
import Header from './component/layout/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;
