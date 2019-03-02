import React, { Component } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import Register from './components/Register/register'
import Dashboard from "./components/Dashboard/dashboard";
import { Route } from 'react-router-dom'


class App extends Component {

  render() {

    return (
      <div>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
