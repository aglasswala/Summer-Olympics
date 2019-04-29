import React from 'react'
import { Grid, Button, withStyles, Typography, Toolbar, AppBar } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import logo from '../../images/riologo.png'

const titlePageStyles = theme => ({
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px"
    },
    root: {
        flexGrow: 1,
      },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
})

const TitlePage = ({ ...props }) => {
    const { classes } = props
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                  <NavLink
                          to='/login'
                          style = {{textDecoration: "none"}}
                  >
                      <Button style = {{color: "#FFFFFF", textDecoration: "none"}}>Login</Button>
                  </NavLink>
                </Toolbar>
            </AppBar>
            <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Grid item>
                    <span className={classes.wrapper} align="center">
                        <img src={logo} alt="Rio 2016" width="50%" height="50%" object-fit="contain"/>
                    </span>
                </Grid>
                <Grid item>
                    <span className={classes.wrapper}>
                        <Typography>
                        Discover Great Events or Create Your Own & Sell Tickets!
                        </Typography>
                    </span>
                </Grid>
                <Grid item>
                    <NavLink
                        to='/register'
                    >
                        <span className={classes.wrapper}>
                            <Button color="secondary" variant="contained">
                                Register
                            </Button>
                        </span>
                    </NavLink>
                </Grid>
            </Grid>
        </div>
    )
}


export default withStyles(titlePageStyles)(TitlePage)