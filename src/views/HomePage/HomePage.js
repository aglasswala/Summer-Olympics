import React from 'react'
import { Drawer, withStyles } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../LoginPage/LoginPage'
import Register from '../Register/register'
import TitlePage from './TitlePage'
import BackgroundSlider from 'react-background-slider'
import image1 from '../../images/rio1.png'
import image2 from '../../images/sidebar-2.jpg'

const homepageStyles = theme => ({
    drawerPaper: {
      border: "none",
      position: "fixed",
      top: "0",
      bottom: "0",
      right: "0",
      zIndex: "1",
      boxShadow:
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      width: 500,
      [theme.breakpoints.up("md")]: {
        width: 500,
        position: "fixed",
        height: "100%"
      },
      [theme.breakpoints.down("sm")]: {
        width: 500,
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
        transform: `translate3d(500px, 0, 0)`,
        transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      }
    },
})

const HomePage = ({...props}) => {
    const { classes } = props
    return (
        <div>
        <BackgroundSlider
            images={[image1, image2 ]}
            duration={4} transition={2} />
            <Drawer
                anchor="left"
                variant="permanent"
                open
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={TitlePage} />
                </Switch>
            </Drawer>
        </div>
    )
}

export default withStyles(homepageStyles)(HomePage)