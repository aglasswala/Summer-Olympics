import React, { Component } from 'react'
import LoginPage from '../components/LoginPage/LoginPage'
import Register from '../components/Register/register'
import { Route, Switch } from 'react-router-dom'

class App extends Component {

  render() {

    return (
      <div>
        <Route path="/" exact component={Register} />
      </div>
    );
  }
}

export default App;
