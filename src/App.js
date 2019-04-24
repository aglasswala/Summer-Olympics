import React, { Component } from 'react'
import Dashboard from './views/DashboardPage/Dashboard'
import HomePage from './views/HomePage/HomePage'
import { Route, Switch, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => ( localStorage.getItem('cool-jwt') ? ( <Component {...props} />)
        : <Redirect strict to={{pathname: "/home", state: {from: props.location}}}/>
    )} />
  )
                                         
class App extends Component {

    componentDidMount() {
        if (localStorage.getItem('cool-jwt')) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
                <div>
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Route component={HomePage} />
                    </Switch>
                </div>
        )
    }
}

export default (App);
