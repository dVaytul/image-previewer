import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./app/common/header";
import Main from "./app/common/main";
import Footer from "./app/common/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="page">
          <Header/>
          <div className="main-content">
            <Main/>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
