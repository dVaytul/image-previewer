import React, { Component } from 'react';
import './App.css';
import SignIn from "./app/auth/auth.js";

class App extends Component {
  render() {
    return (
      <div className="App">

        <SignIn/>

      </div>
    );
  }
}

export default App;
