import React, { Component } from 'react';
import './signin.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    var email = props.email;
    var pass = props.pass;
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
      <form onSubmit={this.handleSubmit}>
        <div className="row form-group justify-content-center">
          <div className="col-2">
            <label>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                   value={this.state.value} onChange={this.onEmailChange} />
          </div>
        </div>
        <div className="row form-group justify-content-center">
          <div className="col-2">
            <label >Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                   value={this.state.value} onChange={this.onPassChange} />
          </div>
        </div>
        <div className="justify-content-center">
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    );
  }
}

export default SignIn;