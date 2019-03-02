import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import indexRoutes from './routes/index.jsx'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />
            })}
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);