import React from 'react'
import { List, ListItem, ListItemText, Drawer, Hidden, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
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
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em",
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
    logo: {
        position: "relative",
        padding: "15px 15px",
        zIndex: "4",
        "&:after": {
            content: '""',
            position: "absolute",
            bottom: "0",
            height: "1px",
            right: "15px",
            width: "calc(100% - 30px)",
            backgroundColor: "rgba(180, 180, 180, 0.3)"
        }
    },
    logoLink: {
        fontFamily: '"Georgia", "Arial", "Helvetica", sans-serif',
        textTransform: "uppercase",
        padding: "5px 0",
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "30px",
        textDecoration: "none",
        backgroundColor: "transparent",
        "&,&:hover": {
          color: "#FFFFFF"
        }
    },
    logoImage: {
      width: "30px",
      display: "inline-block",
      maxHeight: "30px",
      marginLeft: "10px",
      marginRight: "15px"
    },
    img: {
      width: "35px",
      top: "22px",
      position: "absolute",
      verticalAlign: "middle",
      border: "0"
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
    sidebarWrapper: {
        position: "relative",
        height: "calc(100% - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4"
    },
    activePro: {
      position: "absolute",
      width: "100%",
      display: "block",
      textDecoration: "none",
      "&hover,&:focus,&:visited,&": {
          color: "#FFFFFF"
      } 
    }
})

const logoutUser = () => {
  localStorage.removeItem("cool-jwt");
  window.location.href = '/Summer-Olympics/';
}


const Sidebar = ({...props}) => {
    const { classes, logo, image } = props

    const brand = (
        <div className={classes.logo}>
          <div className={classes.logoLink}>
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
            Rio Olympics 2016
          </div>
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
                      <List className={classes.list}>
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          style={{height: "100%"}}
                        >
                          <Grid item>
                            <NavLink
                              to={"/dashboard"}
                              exact
                              className={classes.item}
                              activeClassName="active"
                            >
                              <ListItem button className={classes.itemLink}>
                                <ListItemText
                                  primary={"Events"}
                                  className={classes.itemText}
                                  disableTypography={true}
                                />
                              </ListItem>
                            </NavLink>
                            <NavLink
                              to={"/dashboard/tickets"}
                              exact
                              className={classes.item}
                              activeClassName="active"
                            >
                              <ListItem button className={classes.itemLink}>
                                <ListItemText
                                  primary={"Tickets"}
                                  className={classes.itemText}
                                  disableTypography={true}
                                />
                              </ListItem>
                            </NavLink>
                            <NavLink
                              to={"/dashboard/medalists"}
                              exact
                              className={classes.item}
                              activeClassName="active"
                            >
                              <ListItem button className={classes.itemLink}>
                                <ListItemText
                                  primary={"Medalists"}
                                  className={classes.itemText}
                                  disableTypography={true}
                                />
                              </ListItem>
                            </NavLink>
                            <NavLink
                              to={"/dashboard/userprofile"}
                              exact
                              className={classes.item}
                              activeClassName="active"
                            >
                              <ListItem button className={classes.itemLink}>
                                <ListItemText
                                  primary={"User Profile"}
                                  className={classes.itemText}
                                  disableTypography={true}
                                />
                              </ListItem>
                            </NavLink>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              direction="column"
                              justify="flex-end"
                            >
                              <Grid item>
                                <div
                                  className={classes.activePro}
                                >
                                  <ListItem button className={classes.itemLink} onClick={logoutUser}>
                                    <ListItemText
                                      primary={"Logout"}
                                      className={classes.itemText}
                                      disableTypography={true}
                                    />
                                  </ListItem>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </List>
                    </div>
                    <div
                        className={classes.background}
                        style={{ backgroundImage: "url(" + image + ")" }}
                    />
                </Drawer>
            </Hidden>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state
});

// const mapDispatchToProps = dispatch => ({
//     userLoggedOut: () => dispatch(userLoggedOut())
// });


export default connect(mapStateToProps, null)(withStyles(sidebarStyles)(Sidebar))