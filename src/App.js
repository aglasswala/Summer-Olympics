import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './views/DashboardPage/Dashboard'
import HomePage from './views/HomePage/HomePage'

class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route component={HomePage} />
                </Switch>
            </div>
        )
    }
}

export default (App);