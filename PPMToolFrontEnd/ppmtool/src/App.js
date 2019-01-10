import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './component/Dashboard';
import Header from './component/layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddProject from './component/project/AddProject';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './component/project/UpdateProject';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
