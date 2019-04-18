import React, { Component, Fragment } from 'react'
import { withStyles, TextField, Button, MenuItem, FormControl, InputLabel, Select, Input } from '@material-ui/core'
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

const fixingDate = (date) => {
  let newMonth = date.getMonth() + 1;
  let newDay;
  let newYear = date.getFullYear().toString();
  
  if(date.getMonth()  + 1 < 10){
    newMonth = "0"+ newMonth.toString()
  } else {
    newMonth = newMonth.toString();
  }
  
  if(date.getDate() < 10){
    newDay = "0"+ date.getDate().toString();
  } else {
    newDay = date.getDate().toString();
  }
  return (newYear+"-"+newMonth+"-"+newDay);
}

const fixingTime = (time) => {
  let checktime = parseInt(time);
    if (checktime < 12 && time.includes("AM")) {
      return checktime+":00:00";
    } else if (checktime === 12) {
      return checktime = checktime.toString() + ":00:00";
    } else {
      checktime += 12;
      checktime = checktime.toString() + ":00:00";
      return checktime;
    }
}

const stringToLocal = (result) => {
  let temp = []
  for(let i = 0; i < result.length; i++) {
    const newTime = correctTime(result[i].time, result[i].date).trim()
    temp.push({
      eventid: result[i].eventid,
      sportname: result[i].sportname,
      time: newTime,
      date: result[i].date,
      venue: result[i].venue,
      userid: result[i].userid
    })
  }
  return temp
}

const correctTime = (time, date) => {

  let newMonth = date.substring(5, 7);
  let newDay = date.substring(8, 10);
  let newYear = date.substring(0, 4);
  let newTime;

  if(parseInt(time) < 12){
     newTime = time.toLocaleString('en-GB') + " AM";
  }
  else {
    newTime = time.toLocaleString('en-GB') + " PM";
  }
  const datevalue = parseInt(newDay);
  if(parseInt(time) < 10) {
    if(datevalue > 9){
      return (new Date(newYear, (newMonth) - 1, newDay, newTime.substring(0, 2), newTime.substring(3, 5), newTime.substring(6, 8)).toLocaleString().substring(10, 15) + newTime.substring(8,11)).toString()
    }
    else {
      return (new Date(newYear, (newMonth) - 1, newDay, newTime.substring(0, 2), newTime.substring(3, 5), newTime.substring(6, 8)).toLocaleString().substring(10, 14) + newTime.substring(8,11)).toString()

    }
  }
 else {
    if(datevalue > 9) {
      return (new Date(newYear, (newMonth) - 1, newDay, newTime.substring(0, 2), newTime.substring(3, 5), newTime.substring(6, 8)).toLocaleString().substring(11, 15) + newTime.substring(8,11)).toString()
    }
    else {
      return (new Date(newYear, (newMonth) - 1, newDay, newTime.substring(0, 2), newTime.substring(3, 5), newTime.substring(6, 8)).toLocaleString().substring(10, 15) + newTime.substring(8,11)).toString()

    }  
  }
}


class EditEventForm extends Component {

  state = {
    allEvents: [],
    selectedEvent: {
      sportname: "Soccer",
      time: "12:00:00",
      date: "2012-04-12",
      venue: "Carioca Arena 5"
    }
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


  componentDidMount = () => {
    fetch('http://localhost:3001/api/getCompEvents')
      .then(response => response.json())
      .then(result => {
        const newTime = stringToLocal(result)
        return result
      })
      .then(result => {
        this.setState({
          allEvents: result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  submit = (event) => {

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
              value={this.state.selectedEvent.sportname}
              onChange={this.handleChange("selectedEvent")}
            >
              {this.state.allEvents.map((event, key) => (
                <MenuItem key={key} value={event}>
                  {event.sportname}
                </MenuItem>
              ))}
            </TextField>
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

export default connect(mapStateToProps, null)(withStyles(editEventFormStyles)(EditEventForm))