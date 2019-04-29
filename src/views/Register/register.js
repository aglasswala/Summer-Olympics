import React, { Component } from 'react'
import { withStyles, Grid, Typography, FormControl, InputLabel, Input, Button, TextField, AppBar, Toolbar,Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../actions/user'
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import rings from '../../images/olympicrings.png'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  wrapper: {
    display: "flex",
    position: "relative",
    padding: "8.85px 13px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    widht: "100%"
  },
  textField: {
    boxSizing: "border-box",
    fontWeight: "300",
    textOverflow: "ellipsis",
    transition: ".4s all",
    width: "100%"
  },
  title: {
    alignItems: "center"
  },
})

const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", 'IA', "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 
"MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const COUNTRIES = [
"Afghanistan",
"Albania",
"Algeria",
"Andorra",
"Angola",
"Antigua & Deps",
"Argentina",
"Armenia",
"Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bhutan",
"Bolivia",
"Bosnia Herzegovina",
"Botswana",
"Brazil",
"Brunei",
"Bulgaria",
"Burkina",
"Burundi",
"Cambodia",
"Cameroon",
"Canada",
"Cape Verde",
"Central African Rep",
"Chad",
"Chile",
"China",
"Colombia",
"Comoros",
"Congo",
"Congo {Democratic Rep}",
"Costa Rica",
"Croatia",
"Cuba",
"Cyprus",
"Czech Republic",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"East Timor",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Ethiopia",
"Fiji",
"Finland",
"France",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Greece",
"Grenada",
"Guatemala",
"Guinea",
"Guinea-Bissau",
"Guyana",
"Haiti",
"Honduras",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran",
"Iraq",
"Ireland {Republic}",
"Israel",
"Italy",
"Ivory Coast",
"Jamaica",
"Japan",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Korea North",
"Korea South",
"Kosovo",
"Kuwait",
"Kyrgyzstan",
"Laos",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Macedonia",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Mauritania",
"Mauritius",
"Mexico",
"Micronesia",
"Moldova",
"Monaco",
"Mongolia",
"Montenegro",
"Morocco",
"Mozambique",
"Myanmar, {Burma}",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Poland",
"Portugal",
"Qatar",
"Romania",
"Russian Federation",
"Rwanda",
"St Kitts & Nevis",
"St Lucia",
"Saint Vincent & the Grenadines",
"Samoa",
"San Marino",
"Sao Tome & Principe",
"Saudi Arabia",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Sudan",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Swaziland",
"Sweden",
"Switzerland",
"Syria",
"Taiwan",
"Tajikistan",
"Tanzania",
"Thailand",
"Togo",
"Tonga",
"Trinidad & Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United Kingdom",
"United States",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Vatican City",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe"
]

const formatNumber = (phoneNumber) => {
  const num = phoneNumber.replace(/[- )(]/g,'').trim()
  return num;
}
class Register extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    city: "",
    zip: "",
    state: "NA",
    phoneNumber: "",
    countryOfOrigin: "",
    open: false
  }

  handleClick = () => {
    this.setState({ open: true });
  };

 handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({ open: false });
 };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, street, city, zip, state, countryOfOrigin } = this.state
    const phoneNumber = formatNumber(this.state.phoneNumber);
    
  if(countryOfOrigin.length !== 0 && state.length !== 0) {
    fetch('http://localhost:3001/api/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        street,
        city,
        zip,
        state,
        phoneNumber,
        countryOfOrigin
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.userLoggedIn(data.user)
        localStorage.setItem('cool-jwt', data.token)
        this.props.history.push('/dashboard')
      })
  }else {
    this.handleClick()
  }
}


  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
          <NavLink
            to='/home'
                  style = {{textDecoration: "none"}}
          >
              <Button style = {{color: "#FFFFFF", textDecoration: "none"}}>Home</Button>      
          </NavLink>

          </Toolbar>
        </AppBar>
        <form
          className={classes.form}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <Grid container direction="column" justify="center" alignItems="stretch" style={{ minHeight: '50vh' }}>
            <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography style={{ textAlign: "center", color: "black", font: "2em/1em Trade-Gothic-W-Cond-Bold,Arial,Helvetica,sans-serif", marginBottom: "10px" }}>
              Rio Olympics 2016 Registration
            </Typography>
              <span className={classes.wrapper} align="center" style={{ marginLeft: 150 }}>
                <img src={rings} alt="Olympic Rings" width="70%" height="70%" object-fit="contain" />
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> First Name </InputLabel>
                  <Input
                    id="first_name"
                    name="firstName"
                    type="text"
                    autoComplete="first name"
                    onChange={this.onChange}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Last Name </InputLabel>
                  <Input
                    id="last_name"
                    name="lastName"
                    type="string"
                    autoComplete="last name"
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Email </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Password </InputLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> Home Address </InputLabel>
                  <Input
                    id="street"
                    name="street"
                    type="text"
                    autoComplete="street"
                    autoFocus
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> City </InputLabel>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    autoFocus
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Zip/Postal Code </InputLabel>
                  <Input
                    id="zip"
                    name="zip"
                    type="text"
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
              </span>
            </Grid>
           
            <Grid item xs={12}> 
              <span className={classes.wrapper}>
              {this.state.countryOfOrigin === "United States" ? (
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <TextField 
                    label="State"
                    id="state"
                    select
                    name="state"
                    type="text"
                    autoComplete="state"
                    autoFocus
                    value={this.state.state}
                    onChange={this.onChange}
                    className={classes.group}
                  >
                    {STATES.map((states, key) => (
                      <MenuItem key={key} value={states}>
                        {states}
                      </MenuItem>

                    ))
                    }
                  </TextField>
                </FormControl>
                ) : null}
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <TextField
                    label="Country of Origin"
                    id="countryOfOrigin"
                    select
                    name="countryOfOrigin"
                    type="text"
                    autoComplete="countryoforigin"
                    autoFocus
                    value={this.state.countryOfOrigin}
                    onChange={this.onChange}
                    className={classes.group}
                  >
                    {COUNTRIES.map((countryOfOrigin, key) => (
                      <MenuItem key={key} value={countryOfOrigin}>
                        {countryOfOrigin}
                      </MenuItem>

                    ))
                    }
                  </TextField>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Phone Number </InputLabel>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <Button type="submit" className={classes.textField} style={{ height: "50px" }}>
                  Submit
                </Button>
              </span>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
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
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: (user) => dispatch(userLoggedIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))