import React, { Component, Fragment } from 'react'
import { withStyles, TextField, Button, DialogTitle, Dialog, Typography, Grid, Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
const buyTicketStyles = {
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

class BuyTicket extends Component {

  state = {
    open: false,
    secondsnack: false,
    allEvents: [],
    selectedEvent: {
      sportname: ""
    },
    cost: 30.00,
    snackBarOpen: false,
    vertical: 'top',
    horizontal: 'center',
  }

  handleSnackBarClick = state => () => {
    this.setState({ snackBarOpen: true, ...state });
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  SecondSnackOpen = () => {
    this.setState({ secondsnack: true });
  };

  SecondSnackClose = () => {
    this.setState({ secondsnack: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  


  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  formatTime = time => {
    const date = new Date("February 04, 2011 " + time);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const timeString = date.toLocaleString('en-US', options);
    return timeString
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/getCompEvents')
      .then(response => response.json())
      .then(result => {
        this.setState({
          allEvents: result
        })
      })
      .catch(err => console.log(err))
  }

  submit = () => {
    const userid = this.props.userId
    const event = this.state.selectedEvent.sportname


  if(event.length !== 0){
    fetch('http://localhost:3001/api/buyTickets', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: this.state.selectedEvent.eventid,
        timestamp: new Date().toLocaleString('en-GB').substring(12),
        cost: this.state.cost,
        userid
      })
    })
      .then(response => response.json())
      .then(result => {
        this.handleClose()
        this.SecondSnackClose()
      })
      .then(this.handleSnackBarClick({ vertical: 'top', horizontal: 'center' }))
      .catch(err => console.log("ERR"))
  } else {
    this.SecondSnackOpen()
  }
}

  render() {
    const { classes } = this.props
    const { vertical, horizontal, snackBarOpen, secondsnack} = this.state
    return (
      <Fragment>
        <Button 
          onClick={this.handleClickOpen}
          variant="contained"
          color="primary"
        > 
          Buy Tickets
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle> Buy Tickets </DialogTitle>
          <span className={classes.wrapper}>
            <TextField
              id="sportname"
              label="What event do you wanna go to?"
              required
              className={classes.textField}
              select
              value={this.state.selectedEvent}
              onChange={this.handleChange("selectedEvent")}
              margin="normal"
            >
              {this.state.allEvents.map((event, key) => (
                <MenuItem key={key} value={event}>
                  <Grid 
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                  >
                    <Grid item>
                      {event.sportname}
                    </Grid>
                    <Grid item>
                      {this.formatTime(event.time)}
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </TextField>
          </span>
          <span className={classes.wrapper}>
              {this.props.userType === 3 || this.props.userType === 2 ? (
                <Fragment>
                  <Typography>
                    Total cost: 
                  </Typography>
                  <TextField
                    select
                    value={this.state.cost}
                    onChange={this.handleChange("cost")}
                    fullWidth
                  >
                    <MenuItem value={30.00}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Grid item>
                            $30.00
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem value={0}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Grid item>
                          $0
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </TextField>
                </Fragment>
              ) : (
                <Typography>
                  Cost: $30.00
                </Typography>
              )}
          </span>
          <span className={classes.wrapper}>
            <Button onClick={this.submit} className={classes.button} color="primary" variant="contained">
              Submit
            </Button>
          </span>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackBarOpen}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Success! Checkout the Tickets tab to see your new ticket</span>}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={secondsnack}
          onClose={this.SecondSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please select an Event!</span>}
        />

      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid,
    userType: state.user.usertype
  }
}

export default connect(mapStateToProps, null)(withStyles(buyTicketStyles)(BuyTicket))