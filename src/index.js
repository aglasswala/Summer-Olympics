import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './views/Register/register'
import LoginPage from './views/LoginPage/LoginPage'
import App from './App'

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path='/' component={Register} />
        <Route exact path='/login' component={LoginPage} />
        <Route component={App} />
      </Switch>
    </Router>
    , document.getElementById('root')
);