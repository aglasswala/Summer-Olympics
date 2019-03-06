import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'

import { getJwt } from '../../helpers/jwt'
import dashboardStyles from '../../styles/components/dashboard/dashboardStyles'
import apiCalls from '../../api/apiCalls'


class Dashboard extends Component {

    state = {
        user: undefined
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
                <h1> Hello </h1>
            </div>
        )
    }
}

export default withStyles(dashboardStyles)(Dashboard)