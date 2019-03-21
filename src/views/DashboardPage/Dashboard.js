import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'

import Sidebar from '../../Components/Sidebar/Sidebar'
import Event from '../../Components/Events/Event'
import Tickets from '../../Components/Tickets/Tickets'
import Header from '../../Components/Header/Header'
import dashboardRoutes from '../../routes/dashboardRoutes.jsx'
import logo from '../../images/reactlogo.png'
import image from '../../images/sidebar-2.jpg'

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
        minHeight: "calc(100vh - 123px)"
    },
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
    }
})


class Dashboard extends Component {

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
                            <Switch>
                                <Route exact path="/dashboard" component={Event} />
                                <Route exact path="/dashboard/tickets" component={Tickets} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(dashboardStyles)(Dashboard);