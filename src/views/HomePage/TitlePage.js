import React from 'react'
import { Grid, Button, withStyles, Typography, IconButton, Toolbar, AppBar, Drawer } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import Register from '../Register/register';
import BackgroundSlider from 'react-background-slider'
import image1 from '../../images/titlepage-1.jpg'
const titlePageStyles = theme => ({
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px",
        
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
    }
})

const TitlePage = ({ ...props }) => {
    const { classes } = props
    return (
        <div>
            <AppBar position="static" >
                <Toolbar >
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        News
                    </Typography>
                    <NavLink
                            to='/login'
                            style = {{textDecoration: "none"}}
                    >
                        <Button style = {{color: "#FFFFFF", textDecoration: "none"}}>Login</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
            <div style = {{width: "500px", height: "50%", float: "right", background: 'linear-gradient(to right bottom, #00FFFF, #82ffa1)'}}>
                <Register />
            </div>
            
            {/* <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item>
                    <span className={classes.wrapper}>
                        Brand goes here with Rio Logo
                    </span>
                </Grid>
                <Grid item>
                    <span className={classes.wrapper}>
                        <Typography>
                            Main content will go here ( Basically a couple words on what this application does )
                        </Typography>
                    </span>
                </Grid>
                <Grid item>
                    <NavLink
                        to='/register'
                    >
                        <span className={classes.wrapper}>
                            <Button>
                                Register
                            </Button>
                        </span>
                    </NavLink>
                </Grid>
            </Grid> */}
        </div>
    )
}


export default withStyles(titlePageStyles)(TitlePage)