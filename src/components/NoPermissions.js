import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = props => {
  // Url to redirect when admin enters his login data
  const redirectUrl = props.location.state
    ? props.location.state.redirectUrl
    : "";
  return (
    <div>
      <h5>It looks like you don't have permissions to look this page</h5>
      <p>
        Please
        <Link
          to={{
            pathname: "/admin-login",
            state: { redirectUrl }
          }}
        >
          Log In
        </Link>{" "}
        as an admin for accessing this page
      </p>
    </div>
  );
};

export default Unauthorized;
