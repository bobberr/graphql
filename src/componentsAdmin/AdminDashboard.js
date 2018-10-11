import React from "react";
import { withApollo } from "react-apollo";
import protectedRoute from "../components/protectedRoute";

class AdminDashboard extends React.Component {
  render() {
    return <div>data fetched</div>;
  }
}

export default protectedRoute(withApollo(AdminDashboard));
