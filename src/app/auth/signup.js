import React, { Component } from "react";
import "./signup.css";
import {Link, withRouter} from "react-router-dom";
import AuthService from "../service/AuthService";
import {FormErrors} from './FormErrors';

class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  };

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  };

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  };

  handleSubmit(event) {
    alert('Username: ' + this.state.username + '\nEmail: ' + this.state.email
          + '\nPass: ' + this.state.password + '\nConfirmed Pass: ' + this.state.confirmedPass);
    event.preventDefault();
    AuthService.logIn();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>

        <form className="formSignInUp container" onSubmit={this.handleSubmit}>
          <h2 className="formTitle">Sign up</h2>
          <p>
            <input type="text" className="form-control" placeholder="Username"
                   value={this.state.value} onChange={this.onUsernameChange}/>
          </p>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <p>
              <input type="email"
                     className="form-control"
                     name="email"
                     placeholder="Email"
                     value={this.state.email}
                     onChange={this.handleUserInput}
                     required
              />
            </p>
          </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <p>
              <input type="password"
                     className="form-control"
                     name="password"
                     placeholder="Password"
                     value={this.state.password}
                     onChange={this.handleUserInput}
                     required
              />
            </p>
          </div>
          <p>
            <input type="password" className="form-control" placeholder="Confirm password"
                   value={this.state.value} onChange={this.onConfirmedPassChange} />
          </p>

          <div className="">
            <FormErrors formErrors={this.state.formErrors} />
          </div>

          <button type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!this.state.formValid}>
            Sign up
          </button>

          <hr />
          <p className="linkNewAcc">
            <Link to="/signin">
              Already have an account? Sign in here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);