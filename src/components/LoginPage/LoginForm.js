import React, { Component } from 'react'
import { TextField, Button, InputLabel, Input, FormControl } from '@material-ui/core'
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
                onSubmit={e => this.onSubmit(e)}
            >
                <span className={classes.wrapper}>
                    <FormControl margin="normal" fullWidth required>
                            <InputLabel> Email Address </InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                value={this.state.email}
                                type="text"
                                autoComplete="email" 
                                autoFocus
                                onChange={this.onEmailChange}
                                className={classes.textField}
                            />
                    </FormControl>
                </span>
                <span className={classes.wrapper}>
                    <FormControl margin="normal" fullWidth required>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input 
                                id="password" 
                                name="password" 
                                value={this.state.password}
                                type="password"
                                autoComplete="password" 
                                autoFocus
                                onChange={this.onPasswordChange}
                                className={classes.textField}
                            />
                    </FormControl>
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
