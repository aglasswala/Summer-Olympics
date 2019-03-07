import React, { Component } from 'react'
import { TextField, Button, InputLabel, Input, FormControl, Grid } from '@material-ui/core'
import validator from 'validator'
import { withStyles } from '@material-ui/core'

const styles = {
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px"
    },
    smallText: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
    },
    textField: {
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

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        street: "",
        city: "",
        zip: "",
        state: "",
        phoneNumber: "",
        age: ""
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, email, password } = this.state
        this.props.submit( firstName, lastName, email, password )
    }

    render() {
        console.log(this.state)
        const { classes } = this.props  
        return (
            <form 
                className={classes.form}
                onSubmit={this.submit}
            >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <span className={classes.smallText}>
                            <FormControl margin="normal" fullWidth required>
                                    <InputLabel> First Name </InputLabel>
                                    <Input 
                                        id="first_name" 
                                        name="firstName" 
                                        type="text"
                                        autoFocus
                                        onChange={this.onChange}
                                        className={classes.textField}
                                    />
                            </FormControl>
                        </span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <span className={classes.smallText}>
                            <FormControl margin="normal" fullWidth required>
                                    <InputLabel> Last Name </InputLabel>
                                    <Input 
                                        id="last_name" 
                                        name="lastName" 
                                        type="text"
                                        autoFocus
                                        onChange={this.onChange}
                                        className={classes.textField}
                                    />
                            </FormControl>
                        </span>
                    </Grid>
                </Grid>
                <span className={classes.wrapper}>
                    <FormControl margin="normal" fullWidth required>
                            <InputLabel> Email Address </InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                type="text"
                                autoComplete="email" 
                                autoFocus
                                onChange={this.onChange}
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
                                onChange={this.onChange}
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
