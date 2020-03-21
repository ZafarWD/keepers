import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

import { loginWithJwt } from "../services/storageService";
import { register } from "../services/registerService";
import Form from "./Form";
import LoginAndRegHeading from "./LoginAndRegHeading";
import "../css/login.css";

class Register extends Form {
  schema = {
    name: Joi.string()
      .min(2)
      .max(10)
      .required(),
    email: Joi.string()
      .email()
      .min(11)
      .required(),
    password: Joi.string()
      .min(6)
      .max(29)
      .required()
  };

  async doSubmit() {
    try {
      const { data: jwt } = await register(this.state.data);
      loginWithJwt(jwt);
      this.props.history.replace("/home");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <LoginAndRegHeading />
        <div className="main">
          <div className="col-md-12 col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {this.renderInput("name", "form-control mb-4")}
              </div>
              <div className="form-group">
                {this.renderInput("email", "form-control mb-4")}
              </div>
              <div className="form-group">
                {this.renderInput("password", "form-control", "password")}
              </div>
              {errors && <div className="alert alert-warning">{errors}</div>}
              {this.renderButton("Sign Up")}
            </form>
            <div className="my-3">
              Already a user?
              <Link to="/login"> Login.</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
