import React, { Component } from 'react'
import { TextField, Button, InputLabel, Input } from '@material-ui/core'
import validator from 'validator'
import { withStyles } from '@material-ui/core'

const styles = {
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
    },
    textField: {
        width: "100%",
        boxSizing: "border-box",
        fontWeight: "300",
        textOverflow: "ellipsis",
        transition: ".4s all",
    },
    button: {
        position: "relative",
        width: "100%",
        borderRadius: "3px",
        boxSizing: "border-box",
        marginTop: "20px",
    },
}

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        },
        invalidEmail: false
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state
        this.props.submit(email, password)
    }

    // Need to fix 
    validate = (email, password) => {
        const errors = {}
        if(!validator.isEmail(email)) {
            this.setState({errors: {email: "Invalid Email"}})
            this.setState({invalidEmail: true});
        }
        if(password.length <= 3){
            this.setState({errors: {password: "Password must be over 4 characters"}})
        }
    }

    render() {
        
        const { classes } = this.props
        return (
            <form 
                className={classes.form}
                onSubmit={this.onSubmit}
            >
                <span className={classes.wrapper}>
                    <TextField
                        label="Email Address"
                        className={classes.textField}
                        value={ this.state.email }
                        fullWidth
                        required
                        error={this.state.invalidEmail}
                        helperText={this.state.errors.email}
                        onChange={this.onEmailChange}
                        margin="normal"
                    />
                </span>
                <span className={classes.wrapper}>
                    <TextField
                        label="Password"
                        className={classes.textField}
                        type="password"
                        required
                        value={this.state.password}
                        fullWidth
                        onChange={this.onPasswordChange}
                        margin="normal"
                    />
                </span>
                <span className={classes.wrapper}>
                    <Button
                        className={classes.button}
                        type="submit"
                    >
                        Submit
                    </Button>
                </span>
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm)
