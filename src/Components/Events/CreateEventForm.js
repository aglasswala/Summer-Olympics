import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import CompetitionForm from './CreateEventForms/CompetitionForm'
import CeremonyForm from './CreateEventForms/CeremonyForm'
import AutographForm from './CreateEventForms/AutographForm'
import { withStyles } from '@material-ui/core'

const createEventFormStyles = theme => ({
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
})

const labelOptions = ["Competition", "Medal Ceremony", "Autograph Session"]

class CreateEventForm extends Component {

  state = {
    nameOfEvent: "",
    time: "",
    stadium: "",
    location: "",
    type: ""
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  onTypeChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <form
          className={classes.form}
          style={{width: "400px"}}
        >
          <span className={classes.wrapper}>
            <TextField
              id="nameOfEvent"
              onChange={this.onChange}
              label="Event Name"
              className={classes.textField}
            />
          </span>
          <span className={classes.wrapper}>
            <TextField
              label="Event Name"
              id="type"
              select
              className={classes.textField}
              value={this.state.type}
              onChange={this.onTypeChange("type")}
              margin="normal"
            >
                { this.props.userType !== "athlete" ?
                    labelOptions.map((label, key) => (
                      <MenuItem key={key} value={label}>
                        {label}
                      </MenuItem>
                    ))
                  :
                  <MenuItem value={"Autograph Session"}>
                    Autograph Session
                  </MenuItem>
                }
            </TextField>
          </span>

            {this.state.type === "Competition" ? <CompetitionForm /> : null}
            {this.state.type === "Medal Ceremony" ? <CeremonyForm /> : null}
            {this.state.type === "Autograph Session" ? <AutographForm /> : null}

          <span className={classes.wrapper}>
            <Button className={classes.button}>
              Submit
            </Button>
          </span>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userType: state.user.userType
  }
}

export default connect(mapStateToProps, null)(withStyles(createEventFormStyles)(CreateEventForm))