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
    registeredEvents: [[]]
  };

  componentDidMount() {
    fetch('http://localhost:3001/api/getAthleteEvents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.userid
      })
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        registeredEvents: result.response
      })
    })
    .catch(err => console.log(err))
  }

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
          View my Events
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle> {"View my Events"}</DialogTitle>
          <DialogContent>
            {this.state.registeredEvents.map((event, key) => (
              <ExpansionPanel key={key}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{event[0]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Time: {event[2]}
                  </Typography>
                  <Typography>
                    Date: {event[3]}
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
    userid: state.user.userid
  }
}

export default connect(mapStateToProps)(withStyles(viewAthleteEventStyles)(ViewAthleteEvent))