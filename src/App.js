import React, { Component } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/dashboard'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getJwt } from './helpers/jwt'


class App extends Component {

  render() {
    const jwt = getJwt()
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" render={(props) => (
            <LoginPage {...props} changeSignin={this.changeSignin} />
          )} />
          <Route path="/dashboard" render={() => (
            jwt ? ( <Dashboard /> ) : (<Redirect to="/" />)
          )} />
          <Route component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
