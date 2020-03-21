import React, { Component } from "react";
import Joi from "joi-browser";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Input from "./Input";
import { generate } from "../services/generateService";

class GenerateForm extends Component {
  state = {
    data: { length: 6, memorable: false },
    isGenerated: false,
    generatedPass: "",
    errors: "",
    isCopied: false
  };

  schema = {
    length: Joi.number()
      .max(31)
      .min(6)
      .required(),
    memorable: Joi.boolean().required()
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = parseInt(input.value);
    this.setState({ data });
  };

  handleCheckChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const value = JSON.parse(input.value);
    data.memorable = value ? false : true;
    this.setState({ data });
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema);
    if (!error) return null;
    else return error.details[0].message;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const error = this.validate();
    if (error) {
      this.setState({ errors: error });
      return;
    } else {
      this.doSubmit();
    }
  };

  async doSubmit() {
    console.log("in doSubmit");
    try {
      const { data } = await generate(this.state.data);
      this.setState({
        isGenerated: true,
        generatedPass: data,
        isCopied: false
      });
    } catch (ex) {
      console.log(ex);
      alert("Something went wrong!. Please login again!");
    }
  }

  handleCopy = () => {
    this.setState({ isCopied: true });
  };

  renderBadge = () => {
    return this.state.isCopied ? (
      <span className="badge badge-success ml-3" style={{ cursor: "pointer" }}>
        Copied!
      </span>
    ) : (
      <span className="badge badge-info ml-3" style={{ cursor: "pointer" }}>
        Copy
      </span>
    );
  };

  render() {
    const { data, errors, isGenerated, generatedPass } = this.state;
    return (
      <div className="container mt-3">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-7" style={{ fontSize: "20px" }}>
              <label htmlFor="length">Password Length:</label>
              <span
                className="badge badge-secondary ml-3 px-2"
                style={{ fontSize: "20px" }}
              >
                {data.length}
              </span>
            </div>
            <div className="col-5"></div>
            <div className="col-7" style={{ padding: "5px 0px" }}>
              <Input
                id="length"
                value={data.length}
                className="slider"
                name="length"
                onChange={this.handleChange}
                min="6"
                max="31"
                type="range"
              />
            </div>
            <div className="col-1"></div>
            <div className="col-4" style={{ fontSize: "20px" }}>
              <label className="memorable-label pb-2">
                Easy Password
                <Input
                  type="checkbox"
                  onChange={this.handleCheckChange}
                  value={data.memorable}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {errors && (
              <React.Fragment>
                <div className="col-3"></div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <div className="alert alert-danger">{errors}</div>
                </div>
                <div className="col-3"></div>
              </React.Fragment>
            )}
            {isGenerated && (
              <React.Fragment>
                <div className="col-3"></div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <div className="alert alert-secondary">
                    <span style={{ fontWeight: "bold" }}>Password:</span>&nbsp;
                    &nbsp;
                    {generatedPass}
                    <CopyToClipboard
                      text={generatedPass}
                      onCopy={this.handleCopy}
                    >
                      {this.renderBadge()}
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="col-3"></div>
              </React.Fragment>
            )}
            <div className="col-5" />
            <div className="col-2 ml-3">
              <button
                type="submit"
                className="btn btn-outline-secondary btn-lg"
              >
                Generate
              </button>
            </div>
            <div className="col-5" />
          </div>
        </form>
      </div>
    );
  }
}

export default GenerateForm;
