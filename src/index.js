import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

if (localStorage.getItem("cool-jwt")) {
  console.log(localStorage.getItem("cool-jwt"))

  // store.dispatch(userLoggedIn(user));
}


ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </Router>
    , document.getElementById('root')
);