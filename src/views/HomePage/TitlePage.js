import React from 'react'
import { Grid, Button, withStyles, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const titlePageStyles = theme => ({
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px",
    }
})

const TitlePage = ({ ...props }) => {
    const { classes } = props
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
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
                    <NavLink
                        to='/login'
                    >
                        <span className={classes.wrapper}>
                            <Button>
                                Login
                            </Button>
                        </span>
                    </NavLink>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(titlePageStyles)(TitlePage)