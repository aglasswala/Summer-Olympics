import React, { Component } from 'react'
import { Grid, Typography, FormControl, InputLabel, Input, Button, TextField, AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../actions/user'
import { withStyles } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import rings from '../../images/olympicrings.png'

const styles = theme => ({
  wrapper: {
    display: "flex",
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
    alignItems: "center"
  },
})
const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",'IA',"KS","KY","LA","ME","MD","MA","MI","MN","MS", "MO","MT","NE","NV","NH","NJ","NM","NY","NC", "ND","OH","OK","OR","PA","RI", "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

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
      this.props.userLoggedIn(data.user)
      localStorage.setItem('cool-jwt', data.token)
      this.props.history.push('/dashboard')
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar className={classes.title} position="static" color="primary">
          <Toolbar>
            <Typography style={{color: "white", font: "2em/1em Trade-Gothic-W-Cond-Bold,Arial,Helvetica,sans-serif"}}>
              Rio Olympics 2016 Registration
            </Typography>
          </Toolbar>
        </AppBar>
        <form
          className={classes.form}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <Grid container direction="column" justify="center" alignItems="stretch" style={{ minHeight: '100vh'}}>
            <Grid item xs={12} style={{marginTop: 20}}>
              <span className={classes.wrapper} style={{marginLeft: 150}}>
                <img src={rings} alt="Olympic Rings" width="70%" height="70%" object-fit="contain"/>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{marginRight: 20}}>
                  <InputLabel> First Name </InputLabel>
                  <Input 
                      id="first_name" 
                      name="firstName"
                      type="text"
                      autoComplete="first name"
                      onChange={this.onChange}
                  />
                </FormControl>
                <FormControl fullWidth required>
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
                <FormControl fullWidth required style={{marginRight: 20}}>
                  <InputLabel> Home Address </InputLabel>
                  <Input 
                      id="street"
                      name="street"
                      type="text"
                      autoComplete="street"
                      autoFocus
                      onChange={this.onChange}
                      className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required style={{marginRight: 20}}>
                  <InputLabel> City </InputLabel>
                  <Input
                      id="city" 
                      name="city" 
                      type="text"
                      autoComplete="city"
                      autoFocus
                      onChange={this.onChange}
                      className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Zip </InputLabel>
                  <Input 
                      id="zip" 
                      name="zip" 
                      type="text"
                      onChange={this.onChange}
                      className={classes.group}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12} sm={2}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <TextField
                      label = "State"
                      id="state" 
                      select
                      name="state" 
                      type="text"
                      autoComplete="state"
                      autoFocus
                      value = {this.state.state}
                      onChange={this.onChange}
                  >
                  {STATES.map((states, key)=>(
                    <MenuItem key={key} value={states}>
                        {states}
                    </MenuItem>
                  
                    ))
                  }
                  </TextField>
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
                  <InputLabel> Country of Origin </InputLabel>
                  <Input 
                      id="countryOfOrigin" 
                      name="countryOfOrigin" 
                      type="text"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
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