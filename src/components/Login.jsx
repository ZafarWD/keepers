import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

import { login } from "../services/loginService";
import { loginWithJwt } from "../services/storageService";
import Heading from "./LoginAndRegHeading";
import Form from "./Form";
import "../css/login.css";

class Login extends Form {
  schema = {
    email: Joi.string()
      .email()
      .min(11)
      .required(),
    password: Joi.string().required()
  };

  async doSubmit() {
    try {
      const { data: jwt } = await login(this.state.data);
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
    return (
      <React.Fragment>
        <Heading />
        <div className="main">
          <div className="col-md-12 col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {this.renderInput("email", "form-control mb-4")}
              </div>
              <div className="form-group">
                {this.renderInput("password", "form-control mb-4", "password")}
              </div>
              {this.state.errors && (
                <div className="alert alert-warning">{this.state.errors}</div>
              )}
              {this.renderButton("Login")}
            </form>
            <div className="my-3">
              New here?
              <Link to="/register"> Register.</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
