import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/storageService";

const Jumbotron = () => {
  const user = getCurrentUser();
  return (
    <React.Fragment>
      {user && (
        <div className="jumbotron bg-dark">
          <h1 className="display-4">Welcome, {user.name}!</h1>
          <div className="px-5 mb-5">
            <p className="lead">
              Too many accounts! Too many passwords! Toooo much to remember.
              Generate easy and difficult passwords and store them with ease.
              <br /> Keepers' is the only account and password you need to
              remember!
            </p>
          </div>
          <Link className="button button-1" to="/learn">
            Learn More
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};

export default Jumbotron;
