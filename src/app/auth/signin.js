import React, { Component } from "react";
import "./signin.css";
import {Link, withRouter} from "react-router-dom";
import AuthService from "../service/auth-service";
import FormErrors from "./form-errors";

class SignIn extends Component {
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
        emailValid = this.state.emailValid,
        passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is not valid';
        break;
      case 'password':
        passwordValid = (value.length > 0);
        break;
      default:
        break;
    }
    this.setState( {
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  };

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  };

  errorClass = (error) => {
    return (error.length === 0 ? '' : 'has-error');
  };

  handleSubmit(event) {
    alert('Email: ' + this.state.email
          + '\nPass: ' + this.state.password);
    event.preventDefault();
    AuthService.logIn();
    this.props.history.push("/gallery");
  };

  render() {
    return (
      <form className="signIn-signUp-form container" onSubmit={this.handleSubmit.bind(this)}>
        <h2 className="form-title">Sign in</h2>
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
          <a href=''>
            <small>
              Forgot your password?
            </small>
          </a>
        </div>

        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <button type="submit"
                className="btn btn-primary btn-block"
                disabled={!this.state.formValid}>
          Sign in
        </button>
        <hr />
        <div className="form-link">
          <Link to="/signup">
            Don't have an account? Sign up here
          </Link>
        </div>
      </form>
    );
  }
}

export default withRouter(SignIn);