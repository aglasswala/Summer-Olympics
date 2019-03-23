import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import decode from "jwt-decode";
import { userLoggedIn } from './actions/user'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

if (localStorage.getItem("cool-jwt")) {
  const payload = decode(localStorage.getItem("cool-jwt"))
  console.log(payload.id)
  fetch('http://localhost:3001/api/getUser', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: payload.id
    })
  })
  .then(response => response.json())
  .then(result => store.dispatch(userLoggedIn(result)))
  .catch(err => console.log(err))
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>
  , document.getElementById('root')
);