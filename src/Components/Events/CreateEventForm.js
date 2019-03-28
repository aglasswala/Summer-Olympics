import React, { Component } from 'react'
import { Grid, Typography, FormControl, Input, InputLabel, Button } from '@material-ui/core'

class CreateEventForm extends Component {
  render() {
    return (
      <div>
        <form
          style={{width: "500px"}}
        >
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
              <span>
                <FormControl required>
                  <InputLabel> First Name </InputLabel>
                  <Input 
                      id="first_name" 
                      name="firstName"
                      type="text"
                      autoComplete="first name"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid>
              <span>
                <FormControl required>
                  <InputLabel> Last Name </InputLabel>
                  <Input 
                      id="last_name" 
                      name="lastName" 
                      type="string"
                      autoComplete="last name"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Email </InputLabel>
                  <Input 
                      id="email" 
                      name="email" 
                      type="text"
                      autoComplete="email"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Password </InputLabel>
                  <Input 
                      id="password" 
                      name="password" 
                      type="password"
                      autoComplete="password"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Confirm Password </InputLabel>
                  <Input 
                      id="conPassword" 
                      name="conPassword" 
                      type="password"
                      autoComplete="password"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Street </InputLabel>
                  <Input 
                      id="street" 
                      name="street" 
                      type="text"
                      autoComplete="street"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> City </InputLabel>
                  <Input 
                      id="city" 
                      name="city" 
                      type="text"
                      autoComplete="city"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> State </InputLabel>
                  <Input 
                      id="state" 
                      name="state" 
                      type="text"
                      autoComplete="state"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Zip </InputLabel>
                  <Input 
                      id="zip" 
                      name="zip" 
                      type="number"
                      autoComplete="zip"
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span>
                <Button type="submit" style={{height: "50px"}}>
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

export default CreateEventForm