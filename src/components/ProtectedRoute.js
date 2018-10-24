import React from "react";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import adminClient from "../apolloClients/admin-client";
import CircularProgress from "@material-ui/core/CircularProgress";

// query for just doing request to the server -
// then server takes request and checks for userId inside session object
const query = gql`
  query rotectedRouteQuery {
    checkAuth
  }
`;

const styles = {
  circleStyles: {
    marginTop: "calc(50vh - 75px)",
    marginLeft: "calc(50vw - 75px"
  },
  containerStyles: {
    height: "100vh",
    background: "#232431"
  }
};

const ProtectedRoute = WrappedComponent => {
  return class ProtectedRoute extends React.Component {
    state = {
      loading: true
    };

    // setting state with result of query and also displaying loading until query has been fetched
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
      return (
        <div style={styles.containerStyles}>
          <CircularProgress style={styles.circleStyles} size={150} />
        </div>
      );
    }
  };
};

export default ProtectedRoute;
