import React, { Component } from "react";
import "./header.css";

import {Link} from "react-router-dom";

class Header extends Component {

  render() {
    return (
      <header className="header d-flex flex-row align-items-center">
        <div className="logo">
          <Link to="/">
            <img src="http://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png"
                 alt="logo"/>
          </Link>
        </div>
        <div className="header-title ">The image previewer</div>
        <div className="ml-auto auth">
          <Link to="/signup">Sign Up</Link>
          <span> | </span>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
    );
  }
}

export default Header;