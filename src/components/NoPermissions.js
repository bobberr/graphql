import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = props => {
  return (
    <div>
      <h5>It looks like you don't have permissions to look this page</h5>
      <p>
        Please <Link to="/admin-login">Log In</Link> as an admin for accessing
        this page
      </p>
    </div>
  );
};

export default Unauthorized;
