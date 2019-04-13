import React, { Component } from 'react'
import { withStyles, TextField, Select, Input, InputLabel, FormControl, Button } from '@material-ui/core'
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

const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]
const locations = ["Barra da Tijuca,  Rio de Janeiro, Brazil", "Barra Olympic Park in Rio de Janeiro, Brazil", "Deodoro, Rio de Janeiro, Brazil"]
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

class CompetitionForm extends Component {

  state = {
    sportname: "",
    time: "",
    venue: "",
    date: new Date(),
    registeredAthletes: [],
    allAthletes: []
  }

  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/getAthletes")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          allAthletes: data.athletes
        })
      })
      .catch(err => console.log(err))
  }

  submit = (event) => {
    event.preventDefault();
    const { sportname, time, venue, date, registeredAthletes } = this.state
    fetch('http://localhost:3001/api/createCompetitionEvent', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sportname,
            time,
            venue,
            date,
            registeredAthletes,
            createdBy: this.props.userId
        })
    })
        .then(response => response.json())
        .then(result => {
            this.props.handleClose();
        })
        .catch(err => {
            console.log(err);
        })
  }

  render() {
    const { classes } = this.props
    console.log(this.state)
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
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="select-multiple">Name</InputLabel>
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
          <Button onClick={this.submit} className={classes.button}>
            Submit
          </Button>
        </span>
      </MuiPickersUtilsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user._id
  }
}

export default connect(mapStateToProps, null)(withStyles(competitionFormstyles)(CompetitionForm))