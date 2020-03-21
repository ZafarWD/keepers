import React, { Component } from "react";
import Jumbotron from "./Jumbotron";
import HomeForm from "./HomeForm";
import Navbar from "./Navbar";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron />
        <HomeForm />
      </div>
    );
  }
}

export default Home;
