import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    errors: ""
  };

  validate() {
    const { error } = Joi.validate(this.state.data, this.schema);
    if (!error) return null;
    else return error.details[0].message;
  }

  handleSubmit = e => {
    e.preventDefault();
    const error = this.validate();
    if (error) {
      this.setState({ errors: error });
      return;
    } else {
      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  renderInput(name, className, type = "text") {
    const { data } = this.state;
    return (
      <Input
        name={name}
        type={type}
        className={className}
        placeholder={name}
        value={data[name] || ""}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label) {
    return (
      <button type="submit" className="btn btn-dark btn-lg">
        {label}
      </button>
    );
  }
}

export default Form;
