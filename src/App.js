import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Home from "./components/Home";
import LearnMore from "./components/Learn";
import Passwords from "./components/Passwords";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/learn" component={LearnMore} />
          <Route path="/mypasses" component={Passwords} />
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default App;
