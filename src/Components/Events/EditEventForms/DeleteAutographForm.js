import React, { Component, Fragment } from 'react'
import { withStyles, TextField, MenuItem, Button, Grid } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'

const deleteAutographEventStyles = {
  wrapper: {
    display: "inline-block",
    position: "relative",
    padding: "8.85px 13px"
  },
  textField: {
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "300",
    textOverflow: "ellipsis"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  button: {
    position: "relative",
    width: "100%",
    borderRadius: "3px",
    boxSizing: "border-box",
    marginTop: "20px"
  }
}

const stringToLocal = (result) => {
  let temp = []
  for(let i = 0; i < result.length; i++) {
    const date = new Date("February 04, 2011 " + result[i].time);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const timeString = date.toLocaleString('en-US', options);
    temp.push({
      eventid: result[i].autographeventsid,
      name: result[i].fname + ' ' + result[i].lname,
      time: timeString,
      date: result[i].date,
      venue: result[i].venue,
      userid: result[i].userid
    })
  }
  return temp
}

class DeleteAutographEventForm extends Component {

  state = {
    allEvents: [],
    selectedEvent: {}
  }

  handleSelectedEventChange = name => event => {
    this.setState({
      selectedEvent: { ...this.state.selectedEvent, [name]: event.target.value }
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value 
    });
  }

  formatTime = time => {
    const date = new Date("February 04, 2011 " + time);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const timeString = date.toLocaleString('en-US', options);
    return timeString
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/getAutographEvents')
      .then(response => response.json())
      .then(result => {
        const newTime = stringToLocal(result)
        return newTime
      })
      .then(result => {
        console.log(result)
        this.setState({
          allEvents: result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  submit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/api/deleteAutographEvents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventid: this.state.selectedEvent.eventid,
        userid: this.props.userId
      })
    })
    .then(response => response.json())
    .then(result => {
      this.props.handleAutographDeleteClose()
    })
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <form
          style={{width: "400px"}}
          className={classes.form}
        > 
          <span className={classes.wrapper}>
            <TextField
              id="selectedEvent"
              label="Select an Event to edit"
              required
              className={classes.textField}
              select
              helperText={"There's no going back"}
              value={this.state.selectedEvent}
              onChange={this.handleChange("selectedEvent")}
            >
              {this.state.allEvents.map((event, key) => (
                <MenuItem key={key} value={event}>
                  <Grid 
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                  >
                    <Grid item>
                      {event.name}
                    </Grid>
                    <Grid item>
                      {this.formatTime(event.time)}
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </TextField>
          </span>
          <span className={classes.wrapper}>
            <Tooltip title="Everyone will be notified of the cancelled event">
              <Button color="primary" className={classes.button} variant="contained" onClick={this.submit} >
                Submit
              </Button>
            </Tooltip>
          </span>
        </form>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid
  }
}

export default connect(mapStateToProps, null)(withStyles(deleteAutographEventStyles)(DeleteAutographEventForm))