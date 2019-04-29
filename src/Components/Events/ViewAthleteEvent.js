import React, { Component } from 'react'
import { Button, Dialog, DialogContent, withStyles, AppBar, Toolbar, Slide, Grid, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import EventTable from '../../Components/Events/EventTable'

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
  gridContainer: {
    margin: "0 -15px !important",
    width: "unset"
  },
  gridItem: {
      padding: "0 15px !important"
  },
  card: {
      border: "0",
      marginBottom: "30px",
      marginTop: "30px",
      borderRadius: "6px",
      color: "rgba(0, 0, 0, 0.87)",
      background: "#fff",
      width: "100%",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minWidth: "0",
      wordWrap: "break-word",
      fontSize: ".875rem"
  },  
  cardHeader: {
      padding: "0.75rem 1.25rem",
      marginBottom: "0",
      borderBottom: "none",
      zIndex: "3 !important",
      "&:first-child": {
        borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
      },
      color: "#FFFFFF",
      background: theme.palette.primary.main,
      boxShadow:
        "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardBody: {
      padding: "0.9375rem 20px",
      flex: "1 1 auto",
      position: "relative"
  }
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

          {this.state.registeredEvents.response.length !== 0 || this.state.registeredEvents.ceremonyEvents.length !== 0  ?
            <div>
              <Grid item className={classes.gridItem} xs={12} sm={12} md={12}>
                  <div className={classes.card}>
                      <div className={classes.cardHeader}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                              <Grid item>
                                  <h4 className={classes.cardTitleWhite}>Competition Events</h4>
                                  <p className={classes.cardCategoryWhite}>
                                    Here's all your Competition Events
                                  </p>
                              </Grid>
                          </Grid>
                      </div>
                      <div className={classes.cardBody}>
                          <EventTable 
                              tableHead={["Event", "Stadium", "Time", "Date"]}
                              tableData={this.state.registeredEvents.response}
                          />
                      </div>
                  </div>
              </Grid>
              <Grid item className={classes.gridItem} xs={12} sm={12} md={12}>
                  <div className={classes.card}>
                      <div className={classes.cardHeader}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                              <Grid item>
                                  <h4 className={classes.cardTitleWhite}>Ceremony Events</h4>
                                  <p className={classes.cardCategoryWhite}>
                                    Here's all your Ceremony Events
                                  </p>
                              </Grid>
                          </Grid>
                      </div>
                      <div className={classes.cardBody}>
                          <EventTable 
                              tableHead={["Event", "Stadium", "Time", "Date"]}
                              tableData={this.state.registeredEvents.ceremonyEvents}
                          />
                      </div>
                  </div>
              </Grid>
            </div>
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