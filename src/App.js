import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'

import Sidebar from './Component/Sidebar/Sidebar'
import Header from './Component/Header/Header'
import dashboardRoutes from './routes/dashboardRoutes.jsx'
import logo from './images/reactlogo.png'
import image from './images/sidebar-2.jpg'

const dashboardStyles = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh",
    },
    mainPanel: {
        [theme.breakpoints.up("md")]: {
          width: `calc(100% - 260px)`
        },
        overflow: "auto",
        position: "relative",
        float: "right",
        transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
        maxHeight: "100%",
        width: "100%"
    },
    content: {
        marginTop: "70px",
        padding: "30px 15px",
        minHeight: "calc(100vh - 123px)"
    },
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
    }
})

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if(prop.redirect) 
                return <Redirect from={prop.path} to={prop.to} key={key} />
            return <Route path={prop.path} component={prop.component} key={key} />
        })}
    </Switch>
)


class App extends Component {

    render() {
        const { classes } = this.props
        return (
            <div className={classes.wrapper}>
                <Sidebar 
                    routes={dashboardRoutes}
                    logo={logo}
                    image={image}
                />
                <div className={classes.mainPanel}>
                    <Header 
                        routes={dashboardRoutes}
                    />
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

export default App;