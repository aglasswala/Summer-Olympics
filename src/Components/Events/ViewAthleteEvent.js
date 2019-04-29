import React, { Component } from 'react'
import { Button, Dialog, DialogContent, withStyles, List, ListItem, ListItemText, AppBar, Toolbar, Slide, IconButton } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'

const viewAthleteEventStyles = theme => ({
  dialog: {
    width: "500px"
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ViewAthleteEvent extends Component {
  state = {
    open: false,
    registeredEvents: {
      response: [[]],
      ceremonyEvents: [[]]
    }
  };

  componentDidMount = () => {
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
        registeredEvents: result
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
    const { classes } = this.props
    return (
      <div>
        <Button onClick={this.handleClickOpen}> 
          View my Events
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex} style={{marginLeft: "10px"}}>
              My Events
            </Typography>
          </Toolbar>
          </AppBar>

          {this.state.registeredEvents.response.length !== 0 ? 
            <DialogContent style={{minWidth: '50vw', paddingTop: '20px'}}>
              {this.state.registeredEvents.response.map((event, key) => (
                <ExpansionPanel key={key}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{"Competition: " + event[0]}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem>
                        <ListItemText>
                          Event: {event[0]}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          Time: {event[2]}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          Date: {event[3]}
                        </ListItemText>
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
              {this.state.registeredEvents.ceremonyEvents.map((event, key) => (
                <ExpansionPanel key={key}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{ "Ceremony Event: "  + event[0]}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem>
                        <ListItemText>
                          Event: {event[0]}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          Time: {event[2]}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          Date: {event[3]}
                        </ListItemText>
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </DialogContent>
          : (
            <DialogContent>
              <Typography style={{marginTop: "20px", fontWeight: "bold"}}>
                There are no events you are registered for, you will be notified when you do.
              </Typography>
            </DialogContent>
            )}
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