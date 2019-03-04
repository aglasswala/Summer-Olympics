import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { getJwt } from '../../helpers/jwt'

const styles = {
    wrapper: {
        position: "relative",
        top: 0,
        height: "100vh"
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4",
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: "#000",
            opacity: ".8"
        }
    },
    
}


class Dashboard extends Component {

    state = {
        user: undefined
    }

    componentDidMount() {
        const jwt = getJwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        fetch('http://localhost:3001/getUser', {
            headers: {
                Authentication: `Bearer ${jwt}`
            }
        })
        .then(response => response.json())
        .then(res => res.setState({user: res.user}))
        .catch(err => {
            console.log(err);
        })
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

export default withStyles(styles)(Dashboard)