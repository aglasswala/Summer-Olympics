import React from 'react'
import { connect } from 'react-redux'

const Tickets = ({...props}) => {
    return (
        <div>
            {props.user.user.tickets ? props.user.user.tickets.map((ticket, key) => <h1 key={key}>{ticket}</h1>) : null}
        </div>
    )
}

function mapStateToProps(state) {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Tickets)