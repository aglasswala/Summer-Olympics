import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemText, withStyles, Grid,  CardContent, Card } from '@material-ui/core'

import BuyTicket from './BuyTicket'

const ticketStyles = {
  card: {
    minWidth: '50vw',
    minHeight: '50vh'
  },
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
  },
};

class Tickets extends Component {

  state = {
    userTickets: [[]]
  }

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
          userTickets: response
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
        <div>
            {this.state.userTickets.length !== 0  ? this.state.userTickets.map((ticket, key) => (
              <ExpansionPanel key={key}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{ticket.sportname}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List>
                    <ListItem>
                      <ListItemText>
                        {ticket.sportname}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        {this.formatTime(ticket.time)}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        {ticket.date}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        {ticket.venue}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        {ticket.ticketid}
                      </ListItemText>
                    </ListItem>
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )) : (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            You have no Tickets, click below to buy some
                          </Typography>
                        </Grid>
                        <Grid>
                          <BuyTicket />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
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