import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { userLoggedIn } from '../../actions/user';
import { Grid, Paper, Typography } from '@material-ui/core';

import LoginForm from './LoginForm'

const styles = theme => ({
    paper: {
        background: "white",
        marginTop: "25vh"
    },
    headerSignin: {
        textAlign: "center",
        padding: 20,
        margin: 10
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
})

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon className={classes.iconVariant} style={{fontSize: 20}} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}


class LoginPage extends Component {

    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

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
                this.handleClick()
            })
    }
    render() {
        const { classes } = this.props
        return (
        <Fragment>
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
            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
              >
              <MySnackbarContentWrapper
                variant="error"
                className={classes.margin}
                message="Invalid Credentials!"
              />
            </Snackbar>
        </Fragment>
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