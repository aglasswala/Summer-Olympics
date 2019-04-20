import React, { Component, Fragment } from 'react'
import { withStyles, Grid, Button } from '@material-ui/core'
import { getEvents } from '../../actions/events'
import CreateEvent from './CreateEvent'
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import ViewAthleteEvent from './ViewAthleteEvent'
import { connect } from 'react-redux'
import EventTable from './EventTable'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BuyTicket from '../Tickets/BuyTicket'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import EditEventForm from './EditEventForms/EditEventForm'
import DeleteEventForm from './EditEventForms/DeleteEventForm'
import DeleteAutographForm from './EditEventForms/DeleteAutographForm'

const styles = theme => ({
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
    },
    buttons: {
        display: "inline-block"
    }
})

class Event extends Component { 

    state = {
        compEvents: [[]],
        awardEvents: [[]],
        autoEvents: [[]],
        open: false,
        notificationDialog: false,
        deleteDialog: false,
        deleteAutographEvent: false,
        notifications: []
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleNotificationOpen = () => {
      this.setState({ notificationDialog: true });
    };

    handleNotificationClose = () => {
      this.setState({ notificationDialog: false });
    };

    handleDeleteOpen = () => {
      this.setState({ deleteDialog: true });
    };

    handleDeleteClose = () => {
      this.setState({ deleteDialog: false });
    };

    handleAutographDeleteOpen = () => {
      this.setState({ deleteAutographEvent: true });
    };

    handleAutographDeleteClose = () => {
      this.setState({ deleteAutographEvent: false });
    };

    createInteval = () => {
         setInterval(this.refresh, 2000) // this causes a memory leak
    }

    refresh = () => {
        fetch("http://localhost:3001/api/events")
        .then(response => response.json())
        .then(data => {
            this.props.getEvents(data)
            this.setState({
                compEvents: data.compEvents,
                awardEvents: data.awardEvents,
                autoEvents: data.autoEvents
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.refresh()
        this.createInteval()
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Grid className={classes.gridContainer}>
                    <Grid item className={classes.gridItem}>
                        <Grid 
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Grid 
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={16}
                                >
                                    <Grid item>
                                        <BuyTicket />
                                    </Grid>
                                    <Grid item>
                                        {this.props.usertype === 3 ? <Button color='inherit' onClick={this.handleClickOpen}> Edit an Event </Button> : null}
                                    </Grid>
                                    <Grid item>
                                        {this.props.usertype === 2 ? <ViewAthleteEvent /> : null} 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <div>
                                    <IconButton className={classes.margin} onClick={this.handleNotificationOpen}>
                                      <Badge badgeContent={this.state.notifications.length} color="primary">
                                        <MailIcon />
                                      </Badge>
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
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
                                        <h4 className={classes.cardTitleWhite}>Competition Events</h4>
                                        <p className={classes.cardCategoryWhite}>
                                          Here's all competition events
                                        </p>
                                    </Grid>
                                    {this.props.usertype !== 1 ? (
                                    <Grid item>
                                        <Grid
                                          container
                                          direction="row"
                                          justify="flex-end"
                                          alignItems="center"
                                          spacing={8}
                                        >
                                            <Grid item>
                                                {this.props.usertype === 2 || this.props.usertype === 3 ? <CreateEvent /> : null}
                                            </Grid>
                                            <Grid item>
                                                {this.props.usertype === 3 ? (
                                                    <Fab color="secondary" onClick={this.handleDeleteOpen} size="small">
                                                      <DeleteIcon />
                                                    </Fab>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    ) : null}
                                </Grid>
                            </div>
                            <div className={classes.cardBody}>
                                <EventTable 
                                    tableHead={["Event", "Stadium", "Time", "Date"]}
                                    tableData={this.state.compEvents}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item className={classes.gridItem} xs={12} sm={12} md={12}>
                        <div className={classes.card}>
                            <div className={classes.cardHeader}>
                                <h4 className={classes.cardTitleWhite}>Award Ceremonies</h4>
                                <p className={classes.cardCategoryWhite}>
                                  Here's all the awards ceremonies on going
                                </p>
                            </div>
                            <div className={classes.cardBody}>
                                <EventTable 
                                    tableHead={["Event", "Stadium", "Time", "Date"]}
                                    tableData={this.state.awardEvents}
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
                                        <h4 className={classes.cardTitleWhite}>Autograph sessions</h4>
                                        <p className={classes.cardCategoryWhite}>
                                          Check out what athletes are signing autographs
                                        </p>
                                    </Grid>
                                    <Grid item>
                                    {this.props.usertype !== 1 ? (
                                        <Grid
                                          container
                                          direction="row"
                                          justify="flex-end"
                                          alignItems="center"
                                          spacing={8}
                                        >
                                            <Grid item>
                                                <Fab color="secondary" onClick={this.handleAutographDeleteOpen} size="small">
                                                  <DeleteIcon />
                                                </Fab>
                                            </Grid>
                                        </Grid>
                                    ): null }
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.cardBody}>
                                <EventTable 
                                    tableHead={["Name Of Athlete", "Stadium", "Time", "Date"]}
                                    tableData={this.state.autoEvents}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <DialogTitle>{"Edit an Event"}</DialogTitle>
                  <DialogContent>
                    <EditEventForm />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.notificationDialog}
                  onClose={this.handleNotificationClose}
                >
                  <DialogTitle>{"Here's your notifications"}</DialogTitle>
                  <DialogContent>
                    {"notifications"}
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.deleteDialog}
                  onClose={this.handleDeleteClose}
                >
                  <DialogTitle>{"Delete an event"}</DialogTitle>
                  <DialogContent>
                    <DeleteEventForm handleDeleteClose={this.handleDeleteClose} />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.deleteAutographEvent}
                  onClose={this.handleAutographDeleteClose}
                >
                  <DialogTitle>{"Delete an Autograph Session"}</DialogTitle>
                  <DialogContent>
                    <DeleteAutographForm handleAutographDeleteClose={this.handleAutographDeleteClose} />
                  </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getEvents: (events) => dispatch(getEvents(events))
});

const mapStateToProps = state => {
    return {
        events: state.events,
        usertype: state.user.usertype
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Event))