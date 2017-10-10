import React, { Component } from "react";
import {Link} from "react-router-dom";

import AuthService from "../service/AuthService";

class AuthBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: AuthService.isLoggedIn()};
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut(event) {
    this.state.loggedIn = AuthService.logOut();
  }

  render()
  {
    this.state.loggedIn = AuthService.isLoggedIn();

    if(this.state.loggedIn) {
      let user = AuthService.getCurrentUser();

      return (
        <div>
          <span className="auth-block-username">
            {`Hi, ${user.name} |`}
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