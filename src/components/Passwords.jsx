import React, { Component } from "react";

import Navbar from "./Navbar";
import { getPasswords, deletePassword } from "../services/storeService";

class Passwords extends Component {
  state = {
    data: [],
    requested: false,
    isCopied: false
  };

  async componentDidMount() {
    try {
      const { data: passwords } = await getPasswords();
      this.setState({ data: passwords, requested: true });
    } catch (ex) {
      console.log(ex.response);
      alert("Something went wrong! Please login again.");
      this.props.history.replace("/login");
    }
  }

  handleDelete = async (account, pass) => {
    try {
      await deletePassword({ account, pass });
      window.location.reload(false);
    } catch (ex) {
      console.log(ex.response);
      alert("Something went wrong! Try again!");
    }
  };

  renderPasses() {
    const { data } = this.state;
    return (
      <table className="table table-dark container">
        <thead>
          <tr style={{ fontSize: "20px" }}>
            <th scope="col">#</th>
            <th scope="col">Accounts</th>
            <th scope="col">Passwords</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return (
              <tr key={i} className="table-light border border-dark text-dark">
                <th scope="row">{i + 1}</th>
                <td>{d.account}</td>
                <td>{d.pass}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(d.account, d.pass)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderPage() {
    if (!this.state.requested) {
      return <div className="text-primary container mt-5">Loading...</div>;
    } else {
      if (this.state.data.length) {
        return this.renderPasses();
      } else {
        return (
          <div className="text-danger container mt-5">
            <h2> No passwords stored yet! </h2>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="">{this.renderPage()}</div>
      </React.Fragment>
    );
  }
}

export default Passwords;
