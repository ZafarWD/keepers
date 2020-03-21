import React from "react";
import Joi from "joi-browser";

import { store } from "../services/storeService";
import Form from "./Form";

class StoreForm extends Form {
  schema = {
    account: Joi.string()
      .max(200)
      .min(1)
      .required(),
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
  };

  async doSubmit() {
    const { data } = this.state;
    try {
      await store({
        account: data.account,
        pass: data.password
      });
      console.log("here");
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        if (
          ex.response.data ===
          "This account name already exists! Try a new one."
        ) {
          const errors = ex.response.data;
          this.setState({ errors });
        } else {
          alert("Something went wrong!");
        }
      } else {
        alert("Something went wrong");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 mt-3 pb-5 mb-5">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-4 form group">
                {this.renderInput("account", "form-control")}
              </div>
              <div className="col-4 form-group">
                {this.renderInput("password", "form-control")}
              </div>
              <div className="col-2">{this.renderButton("Store")}</div>
              <div className="col-1"></div>
              {this.state.errors && (
                <React.Fragment>
                  <div className="col-3"></div>
                  <div className="col-6">
                    <div
                      className="alert alert-danger"
                      style={{ textAlign: "center" }}
                    >
                      {this.state.errors}
                    </div>
                  </div>
                  <div className="col-3"></div>
                </React.Fragment>
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreForm;
