import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

const viewAthleteEventStyles = {
  dialog: {
    width: "500px"
  }
}

class ViewAthleteEvent extends Component {
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
    console.log(this.props)
    return (
      <div>
        <Button onClick={this.handleClickOpen}> 
          View my Events
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle> {"View my Events"}</DialogTitle>
          <DialogContent>
            {this.props.registeredEvents.map((event, key) => <h1 key={key}>{event}</h1>)}
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

function mapStateToProps(state) {
  return {
    registeredEvents: state.user.registeredEvents
  }
}

export default connect(mapStateToProps)(withStyles(viewAthleteEventStyles)(ViewAthleteEvent))