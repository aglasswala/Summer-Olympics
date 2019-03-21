import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './views/DashboardPage/Dashboard'
import HomePage from './views/HomePage/HomePage'

class App extends Component {

    state = {
        isAuthenticated: false
    }

    componentDidMount() {
        if(localStorage.getItem('cool-jwt')) {
            this.setState({ isAuthenticated: true })
            this.props.history.push('/dashboard')
        }
    }

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