import { Component } from "react";

import { logout } from "../services/storageService";

class Logout extends Component {
  componentDidMount() {
    logout();
    console.log("helo");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
