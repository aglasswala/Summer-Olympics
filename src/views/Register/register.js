import React, { Component } from 'react'
import { Grid, Typography, FormControl, InputLabel, Input, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../actions/user'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  wrapper: {
    display: "block",
    position: "relative",
    padding: "8.85px 13px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    widht: "100%"
  },
  textField: {
    boxSizing: "border-box",
    fontWeight: "300",
    textOverflow: "ellipsis",
    transition: ".4s all",
    width: "100%"
  },
  title: {
    padding: 20
  }
})

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
      countryOfOrigin: ""
    }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  onSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, street, city, zip, state, phoneNumber, countryOfOrigin } = this.state
    fetch('http://localhost:3001/api/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            street,
            city,
            zip,
            state,
            phoneNumber,
            countryOfOrigin
        })
    })
    .then(response => response.json()) 
    .then(data => {
      console.log(data)
      this.props.userLoggedIn(data.user)
      localStorage.setItem('cool-jwt', data.token)
      this.props.history.push('/dashboard')
    })
  }


  // TODO:
  // 1. put first and last name on the same line
  // 2. put address and city and zip on the same line

  render() {
    const { classes } = this.props
    return (
      <div>
        <form
          className={classes.form}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <Grid container direction="column" justify="center" alignItems="stretch" style={{ minHeight: '100vh' }}>
            <Grid item>
              <Typography
                variant="h5"
                className={classes.title}
              >
                Sign up to see more
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span className={classes.wrapper}>
                <FormControl required>
                  <InputLabel> First Name </InputLabel>
                  <Input 
                      id="first_name" 
                      name="firstName"
                      type="text"
                      autoComplete="first name"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span className={classes.wrapper}>
                <FormControl required>
                  <InputLabel> Last Name </InputLabel>
                  <Input 
                      id="last_name" 
                      name="lastName" 
                      type="string"
                      autoComplete="last name"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Email </InputLabel>
                  <Input 
                      id="email" 
                      name="email" 
                      type="text"
                      autoComplete="email"
                      autoFocus
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Password </InputLabel>
                  <Input 
                      id="password" 
                      name="password" 
                      type="password"
                      autoComplete="password"
                      autoFocus
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Street </InputLabel>
                  <Input 
                      id="street" 
                      name="street" 
                      type="text"
                      autoComplete="street"
                      autoFocus
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> City </InputLabel>
                  <Input 
                      id="city" 
                      name="city" 
                      type="text"
                      autoComplete="city"
                      autoFocus
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> State </InputLabel>
                  <Input 
                      id="state" 
                      name="state" 
                      type="text"
                      autoComplete="state"
                      autoFocus
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Zip </InputLabel>
                  <Input 
                      id="zip" 
                      name="zip" 
                      type="text"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Phone Number </InputLabel>
                  <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      type="text"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Country oF Origin </InputLabel>
                  <Input 
                      id="countryOfOrigin" 
                      name="countryOfOrigin" 
                      type="text"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <Button type="submit" className={classes.textField} style={{height: "50px"}}>
                  Submit
                </Button>
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    userLoggedIn: (user) => dispatch(userLoggedIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))