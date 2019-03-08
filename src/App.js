import React, { Component } from 'react'
// import LoginPage from './Component/LoginPage/LoginPage'
import Register from './Component/Register/register'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { getJwt } from './helpers/jwt'
// import eventsPage from './Component/subComponents/eventsPage'
import RegisterMoreInfo from './Component/Register/RegisterMoreInfo'


class App extends Component {

  render() {
    // const jwt = getJwt()
    return (
    //   <div>
    //     <Switch>
    //       <Route exact path="/" component={Register} />
    //       <Route exact path="/login" component={LoginPage} />
    //       <Route exact path="/dashboard" render={() => (
    //         jwt ? ( <Dashboard /> ) : (<Redirect to="/" />)
    //       )} />
    //       <Route exact component={Register} />
    //     </Switch>
    //   </div>
        <div>
                <Switch>
                    <Route exact path = "/" component={Register}/>
                    <Route exact path = "/moreinfo" component = {RegisterMoreInfo}/>
                </Switch>
        </div>
    );
  }
}

export default App;