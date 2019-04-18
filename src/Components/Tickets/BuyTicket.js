import React, { Component, Fragment } from 'react'
import { withStyles, TextField, Button, DialogTitle, Dialog, Typography } from '@material-ui/core'
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
    allEvents: [],
    selectedEvent: {
      sportname: "Select an Event"
    },
    cost: 30.00
  }

  handleClickOpen = () => {
    this.setState({ open: true });
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
      })
      .catch(err => console.log("ERR "))
  }

  render() {
    const { classes } = this.props
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
                  {event.sportname + " " + event.time}
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
                  >
                    <MenuItem value={30.00}>
                      $30.00
                    </MenuItem>
                    <MenuItem value={0}>
                      $0
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