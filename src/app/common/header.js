import React, { Component } from "react";
import "./header.css";
import {Link} from "react-router-dom";
import AuthBlock from "../auth/auth-block";

class Header extends Component {
  render() {
    return (
      <header className="header d-flex flex-row align-items-center">
        <div className="header__logo">
          <Link to="/gallery">
            <img src="http://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/1024/Preview-icon.png"
                 alt="logo"/>
          </Link>
        </div>
        <div className="header__title">
          Welcome to the image previewer
        </div>
        <div className="header__auth-block ml-auto">
          <AuthBlock />
        </div>
      </header>
    );
  }
}

export default Header;