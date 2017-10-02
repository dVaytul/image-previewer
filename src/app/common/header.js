import React, { Component } from 'react';
import './header.css';

class Header extends Component {

  render() {
    return (
      <header className="header d-flex flex-row align-items-center">
        <div className="">
          <img src="" alt="logo"/>
        </div>
        <div className="header-title ">The image previewer</div>
        <div className="ml-auto ">Sign Up | Sign In</div>
      </header>
    );
  }
}

export default Header;