import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, withStyles } from '@material-ui/core'
import CreateEventForm from './CreateEventForm'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
        <Fab color="secondary" aria-label="Add" size="medium" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
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