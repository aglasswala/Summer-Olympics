import React, { Component, Fragment } from 'react'
import { withStyles, Grid, Button } from '@material-ui/core'
import { getEvents } from '../../actions/events'
import CreateEvent from './CreateEvent'
import ViewAthleteEvent from './ViewAthleteEvent'
import { connect } from 'react-redux'
import EventTable from './EventTable'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BuyTicket from '../Tickets/BuyTicket'
import EditEventForm from './EditEventForms/EditEventForm'

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
        open: false
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
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
                <Grid container className={classes.gridContainer}>
                    <Grid item className={classes.gridItem}>
                        <BuyTicket />
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        {this.props.usertype !== 1 ? <CreateEvent /> : null}
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        {this.props.usertype === 2 ? <ViewAthleteEvent /> : null} 
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
                                    {this.props.usertype === 3 ? (
                                        <Grid item>
                                            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}> Edit an Event </Button>
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
                                <h4 className={classes.cardTitleWhite}>Autograph sessions</h4>
                                <p className={classes.cardCategoryWhite}>
                                  Check out what athletes are signing autographs
                                </p>
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