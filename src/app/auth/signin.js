import React, { Component } from "react";
import "./signin.css";

import {Link, withRouter} from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    const {email, pass} = props;

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
    alert('Email: ' + this.state.email + '\nPass: ' + this.state.pass);
    event.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <form className="formSignInUp" onSubmit={this.handleSubmit}>
        <h2 className="formTitle">Sign in</h2>
        <p>
          <input type="email" className="form-control" placeholder="Email" required
                 value={this.state.value} onChange={this.onEmailChange} />
        </p>
        <p>
          <input type="password" className="form-control" placeholder="Password" required
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
          <Link to="/signup">
            Don't have an account? Sign up here
          </Link>
        </p>
      </form>
    );
  }
}

export default withRouter(SignIn);