import React, { Component } from "react";
//import "./signup.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    const username = props.username;
    const email = props.email;
    const pass = props.pass;
    const confirmedPass = props.confirmedPass;
    this.state = {username: username, email: email, pass: pass, confirmedPass: confirmedPass};

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onConfirmedPassChange = this.onConfirmedPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPassChange(e) {
    this.setState({pass: e.target.value});
  }

  onConfirmedPassChange(e) {
    this.setState({confirmedPass: e.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username + ' Email: ' + this.state.email
          + ' Pass: ' + this.state.pass + ' Confirmed Pass: ' + this.state.confirmedPass);
    event.preventDefault();
  }

  render() {
    return (
      <form className="formSignInUp" onSubmit={this.handleSubmit}>
        <h2 className="formTitle">Sign up</h2>
        <p>
          <input type="text" className="form-control" placeholder="Username"
                 value={this.state.value} onChange={this.onUsernameChange} />
        </p>
        <p>
          <input type="email" className="form-control" placeholder="Email"
                 value={this.state.value} onChange={this.onEmailChange} />
        </p>
        <p>
          <input type="password" className="form-control" placeholder="Password"
                 value={this.state.value} onChange={this.onPassChange} />
        </p>
        <p>
          <input type="password" className="form-control" placeholder="Confirm password"
                 value={this.state.value} onChange={this.onConfirmedPassChange} />
        </p>
        <button type="submit" className="btn btn-primary btn-block">Sign up</button>
      </form>
    );
  }
}

export default SignUp;