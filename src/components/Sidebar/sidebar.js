import React, { Component } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { List, ListItem, ListItemIcon, ListItemText, Icon } from "@material-ui/core";
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const styles = {
    itemText: {
        fontFamily: "'Roboto', sans-serif",
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#FFFFFF"
    }
}

const Sidebar = (props) => {
    const { classes } = props
    return (
        <List>
            <NavLink
                to="/"
            >
                <ListItem button >
                    <ListItemIcon>
                        <Icon><DashboardIcon /></Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Dashboard"
                        disableTypography={true}
                        className={classes.itemText}
                    />
                </ListItem>
            </NavLink>
            <NavLink
                to="/buyTickets"
            >
                <ListItem button >
                    <ListItemIcon>
                        <Icon><DashboardIcon /></Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Buy Tickets"
                        disableTypography={true}
                        className={classes.itemText}
                    />
                </ListItem>
            </NavLink>
            <NavLink
                to="/:userId/tickets"
            >
                <ListItem button >
                    <ListItemIcon>
                        <Icon><DashboardIcon /></Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="View your tickets"
                        disableTypography={true}
                        className={classes.itemText}
                    />
                </ListItem>
            </NavLink>
            <NavLink
                to="/athletes"
            >
                <ListItem button >
                    <ListItemIcon>
                        <Icon><DashboardIcon /></Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Check out athletes"
                        disableTypography={true}
                        className={classes.itemText}

                    />
                </ListItem>
            </NavLink>
            <NavLink
                to="/:userId"
            >
                <ListItem button >
                    <ListItemIcon>
                        <Icon><DashboardIcon /></Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="View Profile"
                        disableTypography={true}
                        className={classes.itemText}
                    />
                </ListItem>
            </NavLink>
        </List>
    )
}

export default withStyles(styles)(Sidebar)


// Sidebar links
// 1. Events 
// 2. Buy Tickets
// 3. View your tickets
// 4. Checkout participating athletes by Event
// 5. User Profile