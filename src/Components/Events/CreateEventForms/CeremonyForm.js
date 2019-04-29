import React, { Component } from 'react'
import { withStyles, TextField, Button, MenuItem, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux'

const ceremonyFormStyles = {
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

let timeSlots = [
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
          "7:30 PM",
          "8:00 PM",
          "8:30 PM"
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


class CeremonyForm extends Component {

  state = {
    allEvents: [],
    allAthletes: [],
    selectedEvent: {},
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
    allCeremonyEvents: [],
    time: "",
    times: [
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM"
    ],
    date: new Date(),
    venue: "",
    count: 0,
    open: false
  }

  updateTimeSlots = (venue, date, timeSlots) => {
    const set = new Set()
    let newTimes = []
    this.state.allCeremonyEvents.map(event => {
      if(event.date.substring(0, 10) === fixingDate(date) && event.venue === venue) {
        const newDate = new Date("February 04, 2011 " + event.time);
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        const timeString = newDate.toLocaleString('en-US', options);
        return set.add(timeString)
      }
      return null
    })
    newTimes = timeSlots.filter(time => !set.has(time))
    return newTimes
  }

  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {
     this.setState({ open: true });
   };

  handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   this.setState({ open: false });
  };

  handleAthleteChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  componentDidMount = () => {
    fetch('https://summer-olympics.herokuapp.com/api/getCompEvents')
      .then(response => response.json())
      .then(result => {
        this.setState({
          allEvents: result
        })
      })
      .then(() => {
        return fetch('https://summer-olympics.herokuapp.com/api/getCereEvents')
          .then(response => response.json())
      })
      .then(data => {
        this.setState({
          allCeremonyEvents: data
        })
      })
      .then(() => {
        return fetch('https://summer-olympics.herokuapp.com/api/getAthletes')
                .then(response => response.json())
      })
      .then(athletes => {
        this.setState({
          allAthletes: athletes.athletes
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  submit = (event) => {
    event.preventDefault()
    const { selectedEvent, firstPlace, secondPlace, thirdPlace, time, date, venue } = this.state
    const newTime = fixingTime(time)
    const newDate = fixingDate(date)

    if(selectedEvent.sportname !== 0 && firstPlace.length !== 0 && secondPlace.length !== 0 && thirdPlace.length !== 0 & time.length !== 0 && venue.length !== 0) {
      fetch('https://summer-olympics.herokuapp.com/api/createCeremonyEvent', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedEvent,
          firstPlace,
          secondPlace,
          thirdPlace,
          newTime,
          newDate,
          venue,
          createdBy: this.props.userId
        })
      })
        .then(response => response.json())
        .then(result => {
          this.props.handleClose()
        })
        .catch (err => {
          console.log(err);
        }) 
    } else {
      this.handleClick()
    }
  }

  render() {
    const { classes } = this.props
    timeSlots = this.updateTimeSlots(this.state.venue, this.state.date, this.state.times)
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <span className={classes.wrapper}>
          <TextField
            id="selectedEvent"
            label="Event Name"
            required
            className={classes.textField}
            select
            value={this.state.selectedEvent}
            onChange={this.handleAthleteChange("selectedEvent")}
            margin="normal"
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
            id="firstPlace"
            label="First Place"
            required
            className={classes.textField}
            select
            value={this.state.firstPlace}
            onChange={this.handleChange("firstPlace")}
            margin="normal"
          >
            {this.state.allAthletes.map((athlete, key) => (
              <MenuItem key={key} value={athlete}>
                {athlete.fname + " " + athlete.lname}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.wrapper}>
          <TextField 
            id="secondPlace"
            label="Second Place"
            required
            className={classes.textField}
            select
            value={this.state.secondPlace}
            onChange={this.handleChange("secondPlace")}
          >
            {this.state.allAthletes.map((athlete, key) => (
              <MenuItem key={key} value={athlete}>
                {athlete.fname + " " + athlete.lname}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.wrapper}>
          <TextField 
            id="thirdPlace"
            label="Third Place"
            required
            className={classes.textField}
            select
            value={this.state.thirdPlace}
            onChange={this.handleChange("thirdPlace")}
          >
            {this.state.allAthletes.map((athlete, key) => (
              <MenuItem key={key} value={athlete}>
                {athlete.fname + " " + athlete.lname}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.wrapper}>
          <TextField
            margin="normal"
            label="What time?"
            select
            required
            className={classes.textField}
            value={this.state.time}
            onChange={this.handleChange("time")}
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
            value={this.state.date}
            className={classes.textField}
            onChange={this.onTimeChange}
          />
        </span>
        <span className={classes.wrapper}>
          <TextField
            id="venue"
            label="Venue"
            required
            className={classes.textField}
            select
            value={this.state.venue}
            onChange={this.handleChange("venue")}
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
          <Button onClick={this.submit} className={classes.button} color="primary" variant="contained">
            Submit
          </Button>
        </span>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Make sure to fill out all the fields</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid
  }
}

export default connect(mapStateToProps, null)(withStyles(ceremonyFormStyles)(CeremonyForm))