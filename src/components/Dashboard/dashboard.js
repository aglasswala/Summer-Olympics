import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Route } from 'react-router-dom'

import { getJwt } from '../../helpers/jwt'
import dashboardStyles from '../../styles/components/dashboard/dashboardStyles'
import apiCalls from '../../api/apiCalls'
import Sidebar from '../Sidebar/sidebar'
import logo from '../../styles/images/reactlogo.png'
import image from '../../styles/images/sidebar-2.jpg'
import Switch from 'react-router-dom'
import eventsPage from '../subComponents/eventsPage'


class Dashboard extends Component {

    state = {
        user: undefined,
        mobileOpen: false
    }

    componentDidMount() {
        const jwt = getJwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        // const a = apiCalls.getUserById()
        //     console.log(a)
        fetch('http://localhost:3001/getUserById', {
            headers: {
                "x-access-token": getJwt() 
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                user: data
            })
            console.log(this.state)
        })
        .catch(err => console.log(err))

    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.wrapper}>
                <Sidebar 
                    open={this.state.mobileOpen}
                    logo={logo}
                    image={image}
                />
                <div className={classes.mainPanel}>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Route exact path="/dashboard/events" component={eventsPage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(dashboardStyles)(Dashboard)