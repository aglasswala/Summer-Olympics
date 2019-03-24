import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../actions/user';
import { Grid, Paper, Typography } from '@material-ui/core';

import LoginForm from './LoginForm'

const styles = {
    paper: {
        background: "white",
        marginTop: "25vh"
    },
    headerSignin: {
        textAlign: "center",
        padding: 20,
        margin: 10
    }
}


class LoginPage extends Component {

    submit = (email, password) => {
        fetch('http://localhost:3001/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(result => {
                this.props.userLoggedIn(result.user)
                localStorage.setItem('cool-jwt', result.userToken)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const { classes } = this.props

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs sm={8} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" className={classes.headerSignin}>
                            Sign In
                        </Typography>
                        <LoginForm
                            submit={this.submit}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    userLoggedIn: (user) => dispatch(userLoggedIn(user))

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));