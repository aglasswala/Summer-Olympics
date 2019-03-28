import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

const headerStyles = theme => ({
    appBar: {
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "0",
        marginBottom: "0",
        position: "absolute",
        width: "100%",
        paddingTop: "10px",
        zIndex: "1029",
        color: "#555555",
        border: "0",
        borderRadius: "3px",
        padding: "10px 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block"
    },
    container: {
        minHeight: "50px",
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    flex: {
        flex: 1
    },
    title: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        margin: "0",
        "&:hover,&:focus":{
            background: "transparent"
        }
    }
})

const Header = ({ ...props }) => {
    const { classes } = props

    const makeBrand = () => {
        let name = 'Events'
        props.routes.map((prop, key) => {
            if(prop.path === window.location.pathname ) {
                name = prop.navbarName
            }
            return null
        });
        return name
    }

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    <Typography className={classes.title}>
                        {props.userType}
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    )
}

function mapStateToProps(state) {
    return {
        userType: state.user.userType
    }
}

export default connect(mapStateToProps)(withStyles(headerStyles)(Header))