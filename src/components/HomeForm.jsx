import React, { Component } from "react";

import GenerateForm from "./GenerateForm";
import StoreForm from "./StoreForm";

class HomeForm extends Component {
  render() {
    return (
      <React.Fragment>
        <GenerateForm />
        <StoreForm />
      </React.Fragment>
    );
  }
}

export default HomeForm;
