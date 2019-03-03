import React, {Component} from "react";
import Button from './Button';
import register from './register';
class Registerbox extends Component{
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        pass: "",
        passConfirmation: ""
        }

    onFirstNameChange = (event) => {
       this.setState({firstName: event.target.value})
    }
    onLastNameChange = (event) => {
        this.setState({ lastName: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }
    onPassChange = (event) => {
        this.setState({ pass: event.target.value })
    }
    onPassConfirmationChange = (event) => {
        this.setState({ passConfirmation: event.target.value})
    }
    onSubmitSignIn = () => {
        console.log(register.firstName)
        fetch('http://localhost:3000/users', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                pass: this.state.pass
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => {
                console.log(err);
            })
    }
    render(){
        return(
            <div className = "inner-container">
                <div className = "box">
                    <div className = "header">
                        Registration
                    </div>
                    <div className = "input-group">
                        <input type = "text" name = "firstname" className = "login-input" placeholder = "First Name" onChange={this.onFirstNameChange}/>
                    </div>
                    <div className = "input-group">
                        <input type = "text" name = "lastname" className = "login-input" placeholder = "Last Name" onChange={this.onSubmitSignIn.onLastNameChange}/>

                    </div>
                    <div className = "input-group">
                        <input type = "text" name = "email" className = "login-input" placeholder = "Email" onChange={this.onEmailChange}/>
                    </div>
                    <div className = "input-group">
                        <input type = "password" name = "password" className = "login-input" placeholder = "Password" onChange={this.onPassChange}/>
                    </div>
                    <div className = "input-group">
                        <input type = "password" name = "passwordConfirm" className = "login-input" placeholder = "Confirm Password" onChange={this.onPassConfirmationChange}/>
                    </div>
                    <div className = "input-group">
                        <input type = "tel" name = "phoneNumber" className = "login-input" placeholder = "Telephone Number" onChange={this.onPhoneNumberChange}/>
                    </div>
                    <Button onClick = {this.onSubmitSignIn}/>
                </div>
            </div>
            )
        
    }
 }

    

export default Registerbox