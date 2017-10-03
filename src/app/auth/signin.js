import React, { Component } from "react";
import "./signin.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    const email = props.email;
    const pass = props.pass;
    this.state = {email: email, pass: pass};

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPassChange(e) {
    this.setState({pass: e.target.value});
  }

  handleSubmit(event) {
    alert('Email: ' + this.state.email + ' pass: ' + this.state.pass);
    event.preventDefault();
  }

  render() {
    return (
      <form className="formSignInUp" onSubmit={this.handleSubmit}>
        <h2 className="formTitle">Sign in</h2>
        <p>
          <input type="email" className="form-control" placeholder="Email"
                 value={this.state.value} onChange={this.onEmailChange} />
        </p>
        <p>
          <input type="password" className="form-control" placeholder="Password"
                 value={this.state.value} onChange={this.onPassChange} />
          <a href='#'>
            <small>
              Forgot your password?
            </small>
          </a>
        </p>
        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        <hr />
        <p className="linkNewAcc">
          <a href='#'>
            Don't have an account? Sign up here
          </a>
        </p>
      </form>
    );
  }
}

export default SignIn;