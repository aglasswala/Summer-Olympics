import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemText } from '@material-ui/core'

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
          userTickets: response
        })
      })
      .catch(err => console.log(err))
  }

  render() {
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
                        {ticket.time}
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
            )) : <h1> You have no tickets </h1>}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userid: state.user.userid
  }
}

export default connect(mapStateToProps, null)(Tickets)