import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import Gallery from "../gallery/gallery";
import SignIn from "../auth/signin";
import SignUp from "../auth/signup";
import AddImagePanel from "../gallery/add-image/add-image";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/add-image' component={AddImagePanel} />
        </Switch>
      </main>
    );
  }
}

export default Main;