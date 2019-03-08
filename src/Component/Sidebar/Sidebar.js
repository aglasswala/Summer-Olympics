import React, { Component } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const sidebarStyles = {
    list: {
        marginTop: "20px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0"
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&hover,&:focus,&:visited,&": {
            color: "#FFFFFF"
        }
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em"
    },
    itemText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#FFFFFF"
    }
}

class Sidebar extends Component {

    render() {
        const { classes } = this.props
        const links = (
            <List className={classes.list}> 
                <NavLink
                    to="/dashboard"
                    className={classes.item}
                    activeClassName="active"
                >
                    <ListItem button className={classes.itemLink}>
                        <ListItemText
                            primary={"Dashboard"}
                            className={classes.itemText}
                            disableTypography={true}
                        />
                    </ListItem>
                </NavLink>
            </List>
        )
        return (
            <div>
                {links}
            </div>
        )
    }
}

export default withStyles(sidebarStyles)(Sidebar)