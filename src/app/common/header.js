import React, { Component } from "react";
import "./header.css";
import {Link} from "react-router-dom";
import AuthBlock from "../auth/auth-block-for-header";

import "../service/auth-service";

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
        <div className="header-title ">Welcome to the image previewer</div>
        <div className="ml-auto auth">
          <AuthBlock loggedIn={false}/>
        </div>
      </header>
    );
  }
}

export default Header;