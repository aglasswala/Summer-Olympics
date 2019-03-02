import React, { Component } from "react";
import Registerbox from './Registerbox';
import { Link, Route } from 'react-router-dom'
import LoginPage from '../LoginPage/LoginForm'

class Register extends Component {

    render() {
        return (
            <div>
                <Registerbox />
                <Link to="/login">Login</Link>
            </div>
        );
    }

}

export default Register