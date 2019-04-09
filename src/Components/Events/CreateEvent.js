import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, withStyles } from '@material-ui/core'
import CreateEventForm from './CreateEventForm'

const createEventStyles = {
  dialog: {
    width: "500px"
  }
}

class CreateEvent extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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
            <CreateEventForm handleClose={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(createEventStyles)(CreateEvent)