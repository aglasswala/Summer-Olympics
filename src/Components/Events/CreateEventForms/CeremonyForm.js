import React, { Component } from 'react'
import { withStyles, TextField, Button } from '@material-ui/core'

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

class CeremonyForm extends Component {

  render() {
    const { classes } = this.props
    return (
      <div>
        <span className={classes.wrapper}>
          <TextField 
            label="Ceremony Form"
            className={classes.textField}
          />
        </span>
        <span className={classes.wrapper}>
          <TextField 
            label="Event Name"
            className={classes.textField}
          />
        </span>
        <span className={classes.wrapper}>
          <TextField 
            label="Event Name"
            className={classes.textField}
          />
        </span>
        <span className={classes.wrapper}>
          <TextField 
            label="Event Name"
            className={classes.textField}
          />
        </span>
        <span className={classes.wrapper}>
          <Button onClick={this.submit} className={classes.button}>
            Submit
          </Button>
        </span>
      </div>
    )
  }
}

export default withStyles(ceremonyFormStyles)(CeremonyForm)