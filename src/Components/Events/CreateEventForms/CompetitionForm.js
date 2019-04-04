import React, { Component } from 'react'
import { withStyles, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
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
  }
}

const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]
const locations = ["Barra da Tijuca,  Rio de Janeiro, Brazil", "Barra Olympic Park in Rio de Janeiro, Brazil", "Deodoro, Rio de Janeiro, Brazil"]
const timeSlots = [
          "8:30 AM",
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 PM",
          "12:30 PM",
          "1:00 PM",
          "1:30 PM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
          "4:30 PM",
          "5:00 PM"
]

class CompetitionForm extends Component {

  state = {
    time: "",
    stadium: "",
    location: "",
    date: new Date()
  }

  onTimeChange = (date) => {
    this.setState({ time: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // Might need to change time picker to hour intervals 

  render() {
    const { classes } = this.props
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <span className={classes.wrapper}>
          <TextField
            margin="normal"
            label="What time?"
            select
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
            id="stadium"
            label="Stadium"
            className={classes.textField}
            select
            value={this.state.stadium}
            onChange={this.handleChange("stadium")}
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
            id="location"
            label="Location"
            className={classes.textField}
            select
            value={this.state.location}
            onChange={this.handleChange("location")}
            margin="normal"
          >
            {locations.map((location, key) => (
              <MenuItem key={key} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
        </span>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(competitionFormstyles)(CompetitionForm)