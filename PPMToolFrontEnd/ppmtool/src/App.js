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
import ProjectBoard from './component/projectBoard/ProjectBoard';
import AddProjectTask from './component/projectBoard/projectTasks/AddProjectTask';
import UpdateProjectTask from './component/projectBoard/projectTasks/UpdateProjectTask';
import Landing from './component/layout/Landing';
import register from './component/userManagement/register';
import login from './component/userManagement/login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions'

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //public routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={register} />
            <Route exact path="/login" component={login} />
            {
              //private routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
            <Route exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
