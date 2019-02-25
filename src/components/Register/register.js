import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core/'

class Register extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        age: "",
    }

    onFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value })
    }
    onLastNameChange = (event) => {
        this.setState({ lastName: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }
    onAgeChange = (event) => {
        this.setState({ age: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/users', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                age: this.state.age
            })
        })
            .then(response => console.log("it's posted"))
    }



    render() {

        return (
            <div>
                <TextField
                    label="First name"
                    onChange={this.onFirstNameChange}
                    margin="normal"
                />
                <TextField
                    label="Last name"
                    onChange={this.onLastNameChange}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    onChange={this.onEmailChange}
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    onChange={this.onPhoneNumberChange}
                    margin="normal"
                />
                <TextField
                    label="Age"
                    onChange={this.onAgeChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    onClick={this.onSubmitSignIn}
                >
                    Submit
                </Button>
            </div>
        )
    }
}

export default Register