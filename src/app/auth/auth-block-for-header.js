import React, { Component } from "react";
import {Link} from "react-router-dom";

class AuthBlock extends Component {
  constructor(props) {
    super(props);
    const {i, name} = props;
    this.state = {i: this.props.loggedIn, name: name};

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut(event) {
      //this.state.i = this.props.loggedIn;
      //this.props.history.push("/");
  }


  render()
  {

    if(!this.state.i) {
      return (
        <div>
          <span className="auth-block-username">
            Hi, Username |
          </span>
          <Link to="/" onClick={this.onLogOut}> Log out</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <span> | </span>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  }

}

export default AuthBlock;