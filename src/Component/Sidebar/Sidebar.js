import React, { Component } from 'react'
import { List, ListItem, ListItemText, Drawer, Hidden } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const sidebarStyles = theme => ({
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
    },
    drawerPaper: {
      border: "none",
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      zIndex: "1",
      boxShadow:
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      width: 260,
      [theme.breakpoints.up("md")]: {
        width: 260,
        position: "fixed",
        height: "100%"
      },
      [theme.breakpoints.down("sm")]: {
        width: 260,
        boxShadow:
          "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        right: "0",
        left: "auto",
        zIndex: "1032",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
        transform: `translate3d(260px, 0, 0)`,
        transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      }
    },
})

const Sidebar = ({...props}) => {
    const { classes, routes } = props

    const links = (
        <List className={classes.list}> 
            {routes.map((prop, key) => {
                return (
                  <NavLink
                    to={prop.path}
                    className={classes.item}
                    activeClassName="active"
                    key={key}
                  >
                    <ListItem button className={classes.itemLink}>
                      <ListItemText
                        primary={prop.sidebarName}
                        className={classes.itemText}
                        disableTypography={true}
                      />
                    </ListItem>
                  </NavLink>
                )
            })}
        </List>
    )

    const brand = (
        <div className={classes.logo}>
          <a href="https://google.com" className={classes.logoLink}>
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
            Summer Olympics
          </a>
        </div>
    )
    return (
        <div>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {links}
                    </div>
                </Drawer>
            </Hidden>
        </div>
    )
    
}

export default withStyles(sidebarStyles)(Sidebar)