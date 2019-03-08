import React, { Component } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'

class EventsPage extends Component {

  render() {
    return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
      >
          <Grid item xs sm={8} md={6} lg={4}>
              <Paper>
                  <Typography variant="display1" >
                      Sign In
                  </Typography>
              </Paper>
          </Grid>
      </Grid>
    )
  }
}

export default EventsPage