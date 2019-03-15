import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './views/HomePage/HomePage'
import App from './App'

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path='/events' component={App} />
        <Route component={HomePage} />
      </Switch>
    </Router>
    , document.getElementById('root')
);