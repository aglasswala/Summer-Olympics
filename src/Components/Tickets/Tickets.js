import React from 'react'
import { connect } from 'react-redux'

const Tickets = ({...props}) => {
    return (
        <div>
            {props.user.tickets ? props.user.tickets.map((ticket, key) => <h1 key={key}>{ticket}</h1>) : <h1> No Tickets yet </h1>}
        </div>
    )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Tickets)