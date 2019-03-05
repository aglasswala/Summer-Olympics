import React, { Component } from 'react'
import { Grid, Paper, Typography   } from '@material-ui/core'
import RegisterForm from './RegisterForm'
import { withStyles } from '@material-ui/core'

const styles = {
  paper: {
    marginTop: "15vh"
  },
  title: {
    textAlign: "center",
    padding: 20,
    margin: 10
  }
}

class Register extends Component {

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item sm={12} md={6} lg={4}>
             <Paper className={classes.paper}>
                <Grid
                  container
                  direction="column"
                > 
                  <Grid item>
                      <Typography
                        variant="display2"
                        className={classes.title}
                      >
                        HELLO
                      </Typography>
                      <RegisterForm />
                  </Grid>
                </Grid>
             </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Register)