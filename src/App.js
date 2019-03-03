import React, { Component } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import Register from './components/Register/register'
import { Route } from 'react-router-dom'


class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <div>
        <Route path='/' exact render={(routeProps) => {
          <LoginPage {...routeProps}  />
        }} />
      </div>
    );
  }
}

export default App;
