import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Hidden, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import sidebarStyles from '../../styles/components/sidebar/sidebarStyles'

class Sidebar extends  Component {

  render() {
    const { classes, image, logo } = this.props
    return (
      <div>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
          >
            <div className={classes.logo}>
              <a href="https://google.com" className={classes.logoLink}>
                <div className={classes.logoImage}>
                  <img src={logo} alt="logo" className={classes.img} />
                </div>
                Rio Summer Olympics
              </a>
            </div>
            <div className={classes.sidebarWrapper}>
              <List className={classes.list}>
                <NavLink
                  to="/dashboard/events"
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
                <NavLink
                  to="/login"
                  className={classes.item}
                  activeClassName="active"
                >
                  <ListItem button className={classes.itemLink}>
                    <ListItemText
                      primary={"Login"}
                      className={classes.itemText}
                      disableTypography={true}
                    />
                  </ListItem>
                </NavLink>
              </List>
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

export default withStyles(sidebarStyles)(Sidebar)
