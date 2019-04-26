import React, { Component } from 'react'
import { withStyles, TextField,  Button, Snackbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';

const autographFormStyles = {
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


const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]
const timeSlots = [
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
          "7:30 PM",
          "8:00 PM",
          "8:30 PM",
          "9:00 PM",
          "9:30 PM",
          "10:00 PM"
]

class AutographForm extends Component {

  state = {
    allAthletes: [],
    selectedAthlete: {},
    time: "",
    date: new Date(),
    venue: "",
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
  componentDidMount = () => {
    if(this.props.userType === 3) {
      fetch("http://localhost:3001/api/getAthletes")
        .then(response => response.json())
        .then(data => {
          this.setState({
            allAthletes: data.athletes
          })
        })
        .catch(err => console.log(err))
    }
  }

  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    const { selectedAthlete, time, venue, date } = this.state
    //Edit here time. 
    const newTime = fixingTime(time);
    const newDate = fixingDate(date);

    const athleteUserId = this.props.userType === 3 ? selectedAthlete.userid : this.props.userId
    if(time.length !== 0 && venue.length !== 0 && athleteUserId.length !== 0) {
      fetch('http://localhost:3001/api/createAutographEvent', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          athleteUserId,
          newTime,
          newDate,
          venue
        })
      })
      .then(response => response.json())
      .then(result => {
        this.props.handleClose()
      })
      .catch(err => console.log(err))
    }
    else {
      this.handleClick()
    }
  }

  render() {
    const { classes } = this.props
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {this.props.userType === 3 ? (
          <span className={classes.wrapper}>
            <TextField
              margin="normal"
              label="Who's signing"
              select
              required
              className={classes.textField}
              value={this.state.selectedAthlete}
              onChange={this.handleChange("selectedAthlete")}
            >
              {this.state.allAthletes.map((athlete, key) => (
                <MenuItem key={key} value={athlete}>
                  {athlete.fname + " " + athlete.lname}
                </MenuItem>
              ))}
            </TextField>
          </span>
        ) : null}
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
    userId: state.user.userid,
    userType: state.user.usertype
  }
}

export default connect(mapStateToProps, null)(withStyles(autographFormStyles)(AutographForm))