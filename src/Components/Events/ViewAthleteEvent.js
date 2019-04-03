import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, withStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

  getEventsById = (events) => {
    // Create function that returns an array of all events with given id's

    // let filteredEvents = events.filter(event => event.)
  }


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
            {this.props.registeredEvents.map((event, key) => (
              <ExpansionPanel key={key}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{event}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
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