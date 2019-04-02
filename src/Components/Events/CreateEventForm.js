import React, { Component } from 'react'
import { Grid, FormControl, Input, InputLabel, Button, TextField } from '@material-ui/core'

class CreateEventForm extends Component {

  state = {
    nameOfEvent: "",
    time: "",
    stadium: "",
    location: "",
    type: ""
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  render() {
    console.log(this.state)
    return (
      <div>
        <form
          style={{width: "500px"}}
        >
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
              <span>
                <FormControl required>
                  <InputLabel> Name of Event </InputLabel>
                  <Input 
                      id="nameOfEvent" 
                      name="nameOfEvent"
                      type="text"
                      onChange={this.onChange}
                      autoFocus
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid>
              <span>
                <FormControl required>
                  <Input 
                      id="time"
                      name="time"
                      type="time"
                      onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item>
              <span>
                <FormControl fullWidth required>
                  <TextField
                    select
                    label="Stadium"
                    value={this.state.stadium}
                  >

                  </TextField>
                </FormControl>
              </span>
            </Grid>
            <Grid item>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Location </InputLabel>
                  <Input
                      name="Location" 
                      type="text"
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item>
              <span>
                <FormControl fullWidth required>
                  <InputLabel> Type </InputLabel>
                  <Input  
                      name="Type" 
                      type="text"
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