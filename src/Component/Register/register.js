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

  state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      phoneNumber: "",
      age: ""
  }

  submit = (firstName, lastName, email, password) => {

      fetch('http://localhost:3001/register', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              firstName,
              lastName,
              email,
              password
          })
      })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(err => {
              console.log(err);
          })
          this.props.history.push("/moreinfo")

  }

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
          <Grid item sm={12} md={6} lg={6}>
             <Paper className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                > 
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography
                        variant="h5"
                        className={classes.title}
                      >
                        this is where content will go
                      </Typography>
                      
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                    >
                      Sign up now
                    </Typography>
                    <RegisterForm 
                      submit={this.submit}
                    />
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