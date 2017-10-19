import React, { Component } from "react";
import {Link} from "react-router-dom";
import AuthService from "../service/auth-service";

class AuthBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: AuthService.isLoggedIn()};
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    this.setState( {loggedIn: AuthService.logOut()});
  }

  render()
  {
    if(AuthService.isLoggedIn()) {
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