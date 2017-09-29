import React, { Component } from 'react';
import './App.css';
import SignIn from "./app/auth/signin.js";
import SignUp from "./app/auth/signup.js";
import AddImagePanel from "./app/gallery/add-image.js";

class App extends Component {
  render() {
    return (
      <div className="App">
         <div className="d-flex flex-row justify-content-center ">
          <SignIn/>
        </div>
        <br/>
        <hr />
        <div className="d-flex flex-row justify-content-center ">
          <SignUp/>
        </div>
        <br/>
        <hr />
        <div className="d-flex flex-row justify-content-center ">
          <AddImagePanel/>
        </div>
        <br/>

      </div>
    );
  }
}

export default App;
