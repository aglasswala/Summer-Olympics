import React, { Component } from 'react'
import { TextField, Button, InputLabel, Input, FormControl, Grid, Paper,Typography } from '@material-ui/core'
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
        alignItems: "stretch",
        width: "100%"
    },
    textField: {
        boxSizing: "border-box",
        fontWeight: "300",
        textOverflow: "ellipsis",
        transition: ".4s all"
    },
    button: {
        position: "relative",
        width: "100%",
        borderRadius: "3px",
        boxSizing: "border-box",
        marginTop: "20px"
    },
    paper: {
        marginTop: "15vh"
    },
    title: {
        textAlign: "center",
        padding: 20,
        margin: 10
    }
}
class RegisterMoreInfo extends Component {
    state = {
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
        // TODO Validate
        this.props.submit( firstName, lastName, email, password )
    }
  render() {
      const { classes } = this.props
    return (
        <form 
            className={classes.form}
            onSubmit={(e) => this.onSubmit(e)}
        >
            <Grid item sm={12} md={6} lg={12}>
                <Paper className = {classes.paper}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >   
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography
                                variant="h5"
                                className={classes.title}
                            >
                            this is where content will go
                            </Typography>
                      
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} direction = "row" justify = "center" alignItems = "center">
                            <Typography
                            variant="h5"
                            className={classes.title}
                            >
                            Continue
                            </Typography>
                                <span className={classes.wrapper}>
                                <FormControl margin="normal" fullWidth required>
                                        <InputLabel> Street </InputLabel>
                                        <Input 
                                            id="street" 
                                            type="text"
                                            autoComplete="street"
                                            autoFocus
                                            onChange={this.onChange}
                                            className={classes.textField}
                                        />
                                </FormControl>
                                </span>
                                <span className={classes.wrapper}>
                                    <FormControl margin="normal" fullWidth required>
                                            <InputLabel>  City </InputLabel>
                                            <Input 
                                                id="city" 
                                                name="city"                                         
                                                type="text"
                                                autoComplete="city"
                                                autoFocus
                                                onChange={this.onChange}
                                                className={classes.textField}
                                            />
                                    </FormControl>
                                </span>
                                <span className={classes.wrapper}>
                                    <FormControl margin="normal" fullWidth required>
                                            <InputLabel> Zip </InputLabel>
                                            <Input 
                                                id="zip" 
                                                name="zip"                                         
                                                type="text"
                                                autoComplete="zip"
                                                autoFocus
                                                onChange={this.onChange}
                                                className={classes.textField}
                                            />
                                    </FormControl>
                                </span>
                                <span className={classes.wrapper}>
                                    <FormControl margin="normal" fullWidth required>
                                            <InputLabel> State </InputLabel>
                                            <Input 
                                                id="state" 
                                                name="state"                                         
                                                type="text"
                                                autoComplete="state"
                                                autoFocus
                                                onChange={this.onChange}
                                                className={classes.textField}
                                            />
                                    </FormControl>
                                </span>
                                <span className={classes.wrapper}>
                                    <FormControl margin="normal" fullWidth required>
                                            <InputLabel> Phone Number </InputLabel>
                                            <Input 
                                                id="phonenumber" 
                                                name="phonenumber"                                         
                                                type="text"
                                                autoComplete="phonenumber"
                                                autoFocus
                                                onChange={this.onChange}
                                                className={classes.textField}
                                            />
                                    </FormControl>
                                </span>
                                <span className={classes.wrapper}>
                                    <FormControl margin="normal" fullWidth required>
                                            <InputLabel>  Age </InputLabel>
                                            <Input 
                                                id="Age" 
                                                name="Age"                                         
                                                type="text"
                                                autoComplete="Age"
                                                autoFocus
                                                onChange={this.onChange}
                                                className={classes.textField}
                                            />
                                    </FormControl>
                                </span>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                            <span className={classes.wrapper}>
                                <Button
                                    className={classes.button}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
             </Grid>
        </form>
    )
  }
}

export default withStyles(styles)(RegisterMoreInfo)