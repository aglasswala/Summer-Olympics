import React, { Component, Fragment } from 'react'
import { withStyles, TextField, Select, Input, InputLabel, FormControl, Button, DialogTitle, Dialog, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';

const buyTicketStyles = {
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
  let newMonth;
  let newDay;
  let newYear = date.getFullYear().toString();
  
  if(date.getMonth() < 10){
    newMonth = "0"+ date.getMonth().toString();
  } else {
    newMonth = date.getMonth().toString();
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

class BuyTicket extends Component {

  state = {
    open: false,
    allEvents: [],
    selectedEvent: {
      sportname: "Select an Event"
    },
    cost: 30,
    userId: this.props.userId
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount = () => {
    fetch('http://localhost:3001/api/getCompEvents')
      .then(response => response.json())
      .then(result => {
        this.setState({
          allEvents: result
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    console.log(this.state)
    console.log(this.props)
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Button 
          onClick={this.handleClickOpen}
          variant="contained"
          color="primary"
        > 
          Buy Tickets
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle> Buy Tickets </DialogTitle>
          <span className={classes.wrapper}>
            <TextField
              id="sportname"
              label="What event do you wanna go to?"
              required
              className={classes.textField}
              select
              value={this.state.selectedEvent}
              onChange={this.handleChange("selectedEvent")}
              margin="normal"
            >
              {this.state.allEvents.map((event, key) => (
                <MenuItem key={key} value={event}>
                  {event.sportname + " " + event.time}
                </MenuItem>
              ))}
            </TextField>
          </span>
          <span className={classes.wrapper}>
              {this.props.userType === 3 || this.props.userType === 2 ? (
                <Fragment>
                  <Typography>
                    Total cost: 
                  </Typography>
                  <TextField
                    select
                    value={this.state.cost}
                    onChange={this.handleChange("cost")}
                  >
                    <MenuItem value={30}>
                      30
                    </MenuItem>
                    <MenuItem value={0}>
                      0
                    </MenuItem>
                  </TextField>
                </Fragment>
              ) : (
                <Typography>
                  Cost: 30
                </Typography>
              )}
          </span>
          <span className={classes.wrapper}>
            <Button onClick={this.submit} className={classes.button}>
              Submit
            </Button>
          </span>
        </Dialog>
      </MuiPickersUtilsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid,
    userType: state.user.usertype
  }
}

export default connect(mapStateToProps, null)(withStyles(buyTicketStyles)(BuyTicket))