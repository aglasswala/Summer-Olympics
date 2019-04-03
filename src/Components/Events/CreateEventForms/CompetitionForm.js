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

class CompetitionForm extends Component {

  state = {
    time: new Date(),
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

  render() {
    const { classes } = this.props
    console.log(this.state)
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <span className={classes.wrapper}>
          <TimePicker
            margin="normal"
            label="Time picker"
            value={this.state.time}
            onChange={this.onTimeChange}
          />
          <DatePicker
            margin="normal"
            label="Date picker"
            value={this.state.date}
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