import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Grid, Button } from '@material-ui/core';
import BuyTicket from '../Tickets/BuyTicket';
import EventTable from '../../Components/Events/EventTable';

const ticketStyles = theme =>({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },gridContainer: {
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
});

const formatTime = time => {
  const date = new Date("February 04, 2011 " + time);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const timeString = date.toLocaleString('en-US', options);
  return timeString
}


const compEventsArrayify = (response) => {
  let newData = []
  for(let i = 0; i < response.length; i++) {
      newData.push([
          response[i].sportname,
          response[i].venue,
          formatTime(response[i].time),
          changeAMPMto24Hours(new Date(response[i].date))
      ])
  }
  return newData
}

const changeAMPMto24Hours = (date) => {
  let newMonth = date.getMonth() + 1;
  let newDay;
  let newYear = date.getFullYear().toString();
  
  if(date.getMonth()  + 1 < 10){
    newMonth = "0"+ newMonth.toString()
  } else {
    newMonth = newMonth.toString();
  }
  
  if(date.getDate() < 10){
    newDay = "0"+ date.getDate().toString();
  } else {
    newDay = date.getDate().toString();
  }
  return (newYear+"-"+newMonth+"-"+newDay);
}

class Tickets extends Component {

  state = {
    userTickets: [[]]
  }

  componentDidMount = () => {
    const id = this.props.userid
    fetch('http://localhost:3001/api/getUserTickets', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          userTickets: compEventsArrayify(response)
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
        <div>
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
                                </Grid>
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
                                        <h4 className={classes.cardTitleWhite}>Tickets Bought</h4>
                                        <p className={classes.cardCategoryWhite}>
                                          Here's all your tickets 
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
                                        </Grid>
                                    </Grid>
                                    ) : null}
                                </Grid>
                            </div>
                            <div className={classes.cardBody}>
                                <EventTable 
                                    tableHead={["Event", "Stadium", "Time", "Date"]}
                                    tableData={this.state.userTickets}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userid: state.user.userid
  }
}

export default connect(mapStateToProps, null)(withStyles(ticketStyles)(Tickets))