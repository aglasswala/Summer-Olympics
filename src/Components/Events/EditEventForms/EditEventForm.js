import React, { Component } from 'react'
import { withStyles, TextField, MenuItem, Button } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux'

const editEventFormStyles = {
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

const timeSlots = [
          "8:00 AM",
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM"
]

const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]

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
      eventid: result[i].eventid,
      sportname: result[i].sportname,
      time: timeString,
      date: new Date(result[i].date),
      venue: result[i].venue,
      userid: result[i].userid
    })
  }
  return temp
}

class EditEventForm extends Component {

  state = {
    allEvents: [],
    selectedEvent: {
      sportname: "",
      time: "12:00:00",
      date: new Date(),
      venue: "Carioca Arena 5"
    },
    allAthletes: [[]],
    registeredAthletes: [],
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

  onTimeChange = (date) => {
    this.setState({ selectedEvent: { ...this.state.selectedEvent, date }})
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/getCompEvents')
      .then(response => response.json())
      .then(result => {
        const newTime = stringToLocal(result)
        return newTime
      })
      .then(result => {
        this.setState({
          allEvents: result
        })
      })
      .then(() => {
        return fetch('http://localhost:3001/api/getAthletes')
          .then(response => response.json())
      })
      .then(athletes => {
        this.setState({
          allAthletes: athletes.athletes
        })
      })
      .catch(err => console.log(err))
  }

  submit = (event) => {
    fetch('http://localhost:3001/api/editEvent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedEvent: this.state.selectedEvent
      })
    })
    .then(response => response.json())
    .then(result => {
      this.props.handleClose()
    })
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form
          style={{width: "400px"}}
          className={classes.form}
        > 
          <span className={classes.wrapper}>
         {this.state.selectedEvent.sportname === "" ? (
            <TextField
              id="selectedEvent"
              label="Select an Event to edit"
              required
              className={classes.textField}
              select
              value={this.state.selectedEvent}
              onChange={this.handleChange("selectedEvent")}
            >
              {this.state.allEvents.map((event, key) => (
                <MenuItem key={key} value={event}>             
                  {event.sportname}
                </MenuItem>
              ))}
            </TextField>
            ) : null}
          </span>
          <span className={classes.wrapper}>
            <TextField 
              id="venue"
              label="Venue"
              required
              className={classes.textField}
              select
              value={this.state.selectedEvent.venue}
              onChange={this.handleSelectedEventChange("venue")}
              margin="normal"
            >
              {stadiums.map((stadium, key) => (
                <MenuItem key={key} value={stadium}>
                  {stadium}
                </MenuItem>
              ))}
            </TextField>
          </span>
          <span className={classes.wrapper}>
            <TextField
              id="time"
              label="What time?"
              required
              className={classes.textField}
              select
              value={this.state.selectedEvent.time}
              onChange={this.handleSelectedEventChange("time")}
              margin="normal"
            >
              {timeSlots.map((time, key) => (
                <MenuItem key={key} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </span>
          <span className={classes.wrapper}>
            <DatePicker
              margin="normal"
              label="What date?"
              value={this.state.selectedEvent.date}
              className={classes.textField}
              onChange={this.onTimeChange}
            />
          </span>
          <span className={classes.wrapper}>
            <Button onClick={this.submit} className={classes.button} color="primary" variant="contained">
              Submit
            </Button>
          </span>
        </form>
      </MuiPickersUtilsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid
  }
}

export default connect(mapStateToProps, null)(withStyles(editEventFormStyles)(EditEventForm))