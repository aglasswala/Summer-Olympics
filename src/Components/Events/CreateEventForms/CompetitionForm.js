import React, { Component } from 'react'
import { withStyles, TextField, Select, Input, InputLabel, FormControl, Button, Snackbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';

const competitionFormstyles = {
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

const filteredAthletes = (registeredAthletes, allAthletes) => {
  let newAthletes = []
  registeredAthletes.map(registeredAthlete => {
    const filtered = allAthletes.filter(athlete => athlete.fname === registeredAthlete.fname && athlete.lname === registeredAthlete.lname)
    return newAthletes.push(filtered[0].userid)
  })
  return newAthletes
}

const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]
let timeSlots = [
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


class CompetitionForm extends Component {

  state = {
    sportname: "",
    time: "",
    venue: "",
    date: new Date(),
    registeredAthletes: [],
    allAthletes: [],
    times:[
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
    ],
    allEvents: [],
    open: false
  }

  handleClick = () => {
     this.setState({ open: true });
   };

  handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   this.setState({ open: false });
  };


  updateTimeSlots = (venue, date, timeSlots) => {
    const set = new Set()
    let newTimes = []
    this.state.allEvents.map(event => {
      if(event.date.substring(0, 10) === fixingDate(date) && event.venue === venue) {
        const date = new Date("February 04, 2011 " + event.time);
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        const timeString = date.toLocaleString('en-US', options);
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

  componentDidMount = () => {
    fetch("https://summer-olympics.herokuapp.com/api/getAthletes")
      .then(response => response.json())
      .then(data => {
        this.setState({
          allAthletes: data.athletes
        })
      })
      .then(() => {
        return fetch('https://summer-olympics.herokuapp.com/api/getCompEvents')
          .then(response => response.json())
      })
      .then(events => {
        this.setState({
          allEvents: events
        })
      })
      .catch(err => console.log(err))
  }

  submit = (event) => {
    event.preventDefault();
    const { sportname, time, venue, date, registeredAthletes, allAthletes } = this.state
    
    //Edit here time. 
    const newTime = fixingTime(time);
    const newDate = fixingDate(date);

    // Need to send athlete userids to the backend
    const filteredRegisteredAthletes = filteredAthletes(registeredAthletes, allAthletes)

    if(time.length !== 0 && venue.length !== 0 && registeredAthletes.length !== 0 && sportname.length !== 0) {
      fetch('https://summer-olympics.herokuapp.com/api/createCompetitionEvent', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              sportname,
              newTime,
              venue,
              newDate,
              filteredRegisteredAthletes,
              createdBy: this.props.userId
          })
      })
          .then(response => response.json())
          .then(result => {
              this.props.handleClose();
          })
          .catch(err => {
              console.log(err + "");
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
            id="sportname"
            onChange={this.handleChange("sportname")}
            label="Event Name"
            className={classes.textField}
            required
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
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="select-multiple">What athletes are participating?</InputLabel>
            <Select
              multiple
              value={this.state.registeredAthletes}
              onChange={this.handleChange("registeredAthletes")}
              input={<Input id="select-multiple" />}
              className={classes.textField}
            >
              {this.state.allAthletes.map((athlete, key) => (
                <MenuItem key={key} value={athlete}>
                  {athlete.fname + " " + athlete.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default connect(mapStateToProps, null)(withStyles(competitionFormstyles)(CompetitionForm))