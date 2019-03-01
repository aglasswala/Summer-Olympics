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
        loading: false,
        errors: {
            email: "",
            password: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmit = () => {
        const { email, password } = this.state
        this.props.submit(email, password)
    }

    render() {
        const { email, password } = this.state
        const { classes } = this.props
        return (
            <form className={classes.form}>
                <span className={classes.wrapper}>
                    <TextField
                        label="Email Address"
                        className={classes.textField}
                        value={email}
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
                        value={password}
                        fullWidth
                        onChange={this.onPasswordChange}
                        margin="normal"
                    />
                </span>
                <span className={classes.wrapper}>
                    <Button
                        onClick={this.onSubmit}
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </span>
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm)
