import React, { Component } from 'react'
import { withStyles, InputLabel, Grid, Input, FormControl, MenuItem, TextField, Button, IconButton,Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';

const userProfileStyles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  gridContainer: {
    margin: "0 -15px !important",
    width: "unset"
  },
  gridItem: {
    padding: "0 15px !important",
    height: "100px"
  },
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem"
  },
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    zIndex: "3 !important",
    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
    },
    color: "#FFFFFF",
    background: theme.palette.primary.main,
    boxShadow:
      "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
  },
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    WebkitBoxFlex: "1",
    position: "relative"
  },
  labelRoot: {
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  button: {
    position: "relative",
    width: "100%",
    borderRadius: "3px",
    boxSizing: "border-box",
    marginTop: "20px",
  }
});


const formatNumber = (phoneNumber) => {
  const num = phoneNumber.replace(/[- )(]/g,'').trim()
  return num;
}


const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", 'IA', "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 
"MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const COUNTRIES=["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
"Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon",
"Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
"Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
"Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy",
"Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
"Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
"Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar, {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau",
"Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa",
"San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain",
"Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
"Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

class UserProfile extends Component {

  state = {
    open: false,
    secondSnack: false,
    userid: this.props.userid,
    firstname: this.props.firstName,
    lastname: this.props.lastName,
    city: this.props.city,
    street: this.props.street,
    state: this.props.state,
    zip: this.props.zip,
    phonenumber: this.props.phoneNumber,
    email: this.props.email,
    countryoforigin: this.props.countryOfOrigin
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {
    this.setState({ open: true });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
 
    this.setState({ open: false });
   };

  secondSnackClick = () => {
    this.setState({ secondSnack: true });
  }

  secondSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
 
    this.setState({ secondSnack: false });
   };
  
  handleme = () => {
    if(this.state.countryoforigin === "United States" && this.state.state.length === 2 && this.state.state === "NA"){
      return ""
    }
    else
      return this.state.state
  }

  submit = (e) => {
    e.preventDefault()
    const newState = this.state.countryoforigin !== "United States" ? ("NA"): this.state.state
    const stateVali = this.handleme()
    const phoneNumber = formatNumber(this.state.phonenumber);

    if(stateVali.length !== 0 && this.state.firstname.length !== 0 && this.state.lastname.length !== 0 && this.state.city.length !== 0 && this.state.email.length !== 0 && this.state.zip.length !== 0 && this.state.phonenumber.length !== 0 && this.state.street.length !== 0) {
      fetch('https://summer-olympics.herokuapp.com/api/updateProfile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid: this.state.userid,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          city: this.state.city,
          street: this.state.street,
          state: newState,
          zip: this.state.zip,
          phonenumber: phoneNumber,
          email: this.state.email,
          countryoforigin: this.state.countryoforigin
        })
      })
      .then(response => response.json())
      .then (() => {
        this.secondSnackClick()
      })
      .catch(err => console.log(err))
    } else {
      this.handleClick()
    }
  }

  render() {
    const { classes } = this.props
    return (
      <form
        onSubmit={e => this.submit(e)}
      >
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={12}>
            <div className={classes.card}> 
              <div className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </div>
              <div className={classes.cardBody}>
                <Grid container className={classes.gridContainer}>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={5}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"firstname"}
                      >
                        {"First Name"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id="firstname"
                        value={this.state.firstname}
                        onChange={this.handleChange("firstname")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={7}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"lastname"}
                      >
                        {"Last Name"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"lastname"}
                        value={this.state.lastname}
                        onChange={this.handleChange("lastname")}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container className={classes.gridContainer}>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"email"}
                      >
                        {"Email"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"Email"}
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"homeaddress"}
                      >
                        {"Home address"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"homeaddress"}
                        value={this.state.street}
                        onChange={this.handleChange("street")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"city"}
                      >
                        {"City"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"city"}
                        value={this.state.city}
                        onChange={this.handleChange("city")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={3}>
                    {this.state.countryoforigin === "United States" ? (
                      <FormControl fullWidth required style={{ marginRight: 20 }}>
                        <TextField
                          label="State"
                          id="state"
                          select
                          name="state"
                          value={this.state.state}
                          type="text"
                          autoComplete="state"
                          onChange={this.handleChange("state")}
                          autoFocus
                        >
                          {STATES.map((states, key) => (
                            <MenuItem key={key} value={states}>
                              {states}
                            </MenuItem>
                          ))
                          }
                        </TextField>
                      </FormControl>
                    ) : null }
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl fullWidth required style={{ marginRight: 20 }}>
                      <TextField
                        label="Country of Origin"
                        id="countryOfOrigin"
                        select
                        name="countryOfOrigin"
                        value={this.state.countryoforigin}
                        type="text"
                        onChange={this.handleChange("countryoforigin")}
                        autoComplete="countryoforigin"
                        autoFocus
                      >
                        {COUNTRIES.map((countryOfOrigin, key) => (
                          <MenuItem key={key} value={countryOfOrigin}>
                            {countryOfOrigin}
                          </MenuItem>
                        ))
                        }
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"phoneNumber"}
                      >
                        {"Phone Number"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"phoneNumber"}
                        value={this.state.phonenumber}
                        onChange={this.handleChange("phonenumber")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={12} sm={12} md={8}>
                    <FormControl fullWidth>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"zip"}
                      >
                        {"Postal Code"}
                      </InputLabel>
                      <Input
                        style={{marginTop: "16px"}}
                        id={"zip"}
                        value={this.state.zip}
                        onChange={this.handleChange("zip")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem} xs={3}>
                    <Button
                      className={classes.button}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Make sure to fill out all the fields</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.secondSnack}
          autoHideDuration={6000}
          onClose={this.secondSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Your profile has been updated! Please log out and log back in to see your changes</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.secondSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </form>
    )
  }
}


function mapStateToProps(state) {
  return {
    userid: state.user.userid,
    firstName: state.user.fname,
    lastName: state.user.lname,
    street: state.user.street,
    city: state.user.city,
    state: state.user.state,
    zip: state.user.zip,
    email: state.user.email,
    phoneNumber: state.user.phonenumber,
    countryOfOrigin: state.user.countryoforigin
  }
}

export default connect(mapStateToProps, null)(withStyles(userProfileStyles)(UserProfile))