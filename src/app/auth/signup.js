import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import AuthService from "../service/auth-service";
import FormErrors from "./form-errors";

class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmed: '',
      formErrors: {username: '', email: '', password: '', confirmed: ''},
      emailValid: false,
      passwordValid: false,
      matchPasswords: false,
      formValid: false
    };
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState( {
      [name]: value},
      () => { this.validateField(name, value)
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors,
        usernameValid = this.state.formErrors,
        emailValid = this.state.emailValid,
        passwordValid = this.state.passwordValid,
        matchPasswords = this.state.matchPasswords;

    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^[A-Za-z]+$/);
        fieldValidationErrors.username = usernameValid ? '' : ' can contain only letters';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is not valid';
        break;

      case 'password':
        let errorText = "",
            lengthPass = false,
            hasDigit = false,
            hasNotSpecSymbols = false,
            hasLowerLetter = false,
            hasUpperLetter = false;

        if(value.length >= 6) {
          lengthPass = true;
        } else {
          errorText += ", is to short";
        }

        if(value.match(/\d/)) {
          hasDigit = true;
        } else {
          errorText += ", hasn't digit";
        }

        if(!(value.match(/_/)) && !(value.match(/\W/))) {
          hasNotSpecSymbols = true;
        } else {
          errorText += ", has special symbol";
        }

        if(value.match(/[a-z]/)) {
          hasLowerLetter = true;
        } else {
          errorText += ", hasn't lower case letter";
        }

        if(value.match(/[A-Z]/)) {
          hasUpperLetter = true;
        } else {
          errorText += ", hasn't upper case letter";
        }

        passwordValid = lengthPass && hasDigit && hasNotSpecSymbols && hasLowerLetter && hasUpperLetter;
        fieldValidationErrors.password = passwordValid ? "" : `${errorText.replace(errorText[0], "")}`;

        if (this.state.confirmed !== "") {
          matchPasswords = (this.state.confirmed === this.state.password);
          fieldValidationErrors.confirmed = matchPasswords ? "" : " does not match";
        }
        break;

      case 'confirmed':
        matchPasswords = (this.state.confirmed === this.state.password);
        fieldValidationErrors.confirmed = matchPasswords ? "" : " password does not match";
        break;

      default:
        break;
    }
    this.setState( {
      formErrors: fieldValidationErrors,
      usernameValid: usernameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      matchPasswords: matchPasswords,
    }, this.validateForm);
  };

  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.emailValid
                   && this.state.passwordValid && this.state.matchPasswords});
  };

  errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error');
  };

  handleSubmit(event) {
    alert('Username: ' + this.state.username
          + '\nEmail: ' + this.state.email
          + '\nPass: ' + this.state.password
          + '\nConfirmed Pass: ' + this.state.confirmed);
    event.preventDefault();
    AuthService.logIn();
    this.props.history.push("/gallery");
  };

  render() {
    return (
      <div>
        <form className="signIn-signUp-form container" onSubmit={this.handleSubmit.bind(this)}>
          <h2 className="form-title">Sign up</h2>
          <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
            <input type="text"
                   className="form-control"
                   name="username"
                   placeholder="Username"
                   value={this.state.username}
                   onChange={this.handleUserInput}
                   required/>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <input type="email"
                   className="form-control"
                   name="email"
                   placeholder="Email"
                   value={this.state.email}
                   onChange={this.handleUserInput}
                   required/>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <input type="password"
                   className="form-control"
                   name="password"
                   placeholder="Password"
                   value={this.state.password}
                   onChange={this.handleUserInput}
                   required/>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.confirmed)}`}>
            <input type="password"
                   className="form-control"
                   name="confirmed"
                   placeholder="Confirm password"
                   value={this.state.confirmed}
                   onChange={this.handleUserInput}
                   required/>
          </div>

          <div>
            <FormErrors formErrors={this.state.formErrors}/>
          </div>

          <button type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!this.state.formValid}>
            Sign up
          </button>

          <hr />
          <div className="form-link">
            <Link to="/signin">
              Already have an account? Sign in here
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);