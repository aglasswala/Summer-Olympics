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

class RegisterForm extends Component {

    render() {
        
        const { classes } = this.props
        return (
            <form 
                className={classes.form}
            >
                <span className={classes.wrapper}>
                    <FormControl margin="normal" fullWidth required>
                            <InputLabel> Email Address </InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                type="text"
                                autoComplete="email" 
                                autoFocus
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
                                type="password"
                                autoComplete="password" 
                                autoFocus
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

export default withStyles(styles)(RegisterForm)
