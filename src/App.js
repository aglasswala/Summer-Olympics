import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'

import Sidebar from './Component/Sidebar/Sidebar'
import Header from './Component/Header/Header'
import dashboardRoutes from './routes/dashboardRoutes.jsx'

const dashboardStyles = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh",
    },
    mainPanel: {
        overflow: "auto",
        position: "relative",
        float: "right",
        transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
        maxHeight: "100%",
        width: "100%",
        overflowScroller: "touch"
    },

})

const switchRoutes = (
    <Switch>
        <Route exact path='/' render={() => <h1> First Route </h1>} />
        <Route exact path='/two' render={() => <h1> Second Route </h1>} />
        <Route exact path='/three' render={() => <h1> Third Route </h1>} />
    </Switch>
)

class App extends Component {
    state = {
        mobileOpen: false
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.wrapper}>
                <Sidebar 
                    routes={dashboardRoutes}
                />
                <div className={classes.mainPanel}>
                    <Header />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            {switchRoutes}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(dashboardStyles)(App);
