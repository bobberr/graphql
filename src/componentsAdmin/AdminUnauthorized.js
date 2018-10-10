import React from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";

const AdminUnauthorized = props => {
  return (
    <div>
      <h3>
        You are unauthorized for using this page as the admin please log in
      </h3>
      <Link to="/admin-login">
        <RaisedButton label="To login page" primary={true} />
      </Link>
    </div>
  );
};

export default AdminUnauthorized;
