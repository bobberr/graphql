import React from "react";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import adminClient from "../apolloClients/admin-client";

const query = gql`
  query rotectedRouteQuery {
    checkAuth
  }
`;

const protectedRoute = WrappedComponent => {
  return class protectedRoute extends React.Component {
    state = {
      loading: true
    };
    async componentDidMount() {
      const result = await adminClient.query({
        query,
        fetchPolicy: "network-only"
      });
      this.setState({
        isAuth: result.data.checkAuth,
        loading: result.loading
      });
    }

    render() {
      if (!this.state.loading) {
        if (this.state.isAuth) {
          return <WrappedComponent />;
        }
        return <Redirect to="/unauthorized" />;
      }
      return <p>Loading...</p>;
    }
  };
};

export default protectedRoute;
