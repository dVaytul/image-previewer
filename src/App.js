import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./app/common/header"
import Main from "./app/common/main"
import Footer from "./app/common/footer"
import AuthService from "./app/auth/auth-block-for-header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gallery">
          <Header/>
          <div className="content">
            <Main/>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
