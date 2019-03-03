import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
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
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmit = () => {
        const { email, password } = this.state
        
        this.props.submit(email, password)
    }

    render() {
        
        const { classes } = this.props
        console.log(this.state)
        return (
            <form 
                className={classes.form}
            >
                <span className={classes.wrapper}>
                    <TextField
                        label="Email Address"
                        className={classes.textField}
                        value={ this.state.email }
                        fullWidth
                        onChange={this.onEmailChange}
                        margin="normal"
                    />
                </span>
                <span className={classes.wrapper}>
                    <TextField
                        label="Password"
                        className={classes.textField}
                        type="password"
                        value={this.state.password}
                        fullWidth
                        onChange={this.onPasswordChange}
                        margin="normal"
                    />
                </span>
                <span className={classes.wrapper}>
                    <Button
                        className={classes.button}
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm)
