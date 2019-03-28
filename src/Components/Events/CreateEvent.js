import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles } from '@material-ui/core'
import CreateEventForm from './CreateEventForm'

const createEventStyles = {
  dialog: {
    width: "500px"
  }
}

class CreateEvent extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props
    return (
      <div>
        <Button onClick={this.handleClickOpen}> 
          Create Event
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle> {"Create an event"}</DialogTitle>
          <DialogContent>
            <CreateEventForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(createEventStyles)(CreateEvent)