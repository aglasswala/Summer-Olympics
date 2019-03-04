import React, { Component } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import Register from './components/Register/register'
import Dashboard from './components/Dashboard/dashboard'
import { Route, Switch, Redirect } from 'react-router-dom'



class App extends Component {

  state = {
    isLoggedIn: false
  }

  changeSignin = (login) => {
    this.setState({ isLoggedIn: login})
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" render={(props) => (
            <LoginPage {...props} changeSignin={this.changeSignin} />
          )} />
          <Route path="/dashboard" render={() => (
            this.state.isLoggedIn ? ( <Dashboard /> ) : (<Redirect to="/" />)
          )} />
          <Route component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
