import React, { Component } from 'react'
import { withStyles, TextField } from '@material-ui/core'

//import {styles} from "";
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
  }
}

class AutographForm extends Component {

  render() {
    const { classes } = this.props
    return (
      <form className={classes.form}>
        <span className={classes.wrapper}>
          <TextField 
            label="Autograph Form"
            className={classes.textField}
          />
        </span>
      </form>
    )
  }
}

export default withStyles(autographFormStyles)(AutographForm)