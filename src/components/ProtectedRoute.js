import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  query ProtectedRouteQuery {
    checkAuth
  }
`;

class ProtectedRoute extends React.Component {
  state = {};
  isOpened = true;
  async componentDidMount() {
    const promiseResult = await this.props.client.query({ query });
    console.log(promiseResult);
    if (this.isOpened) {
      this.setState({ isAuth: promiseResult.checkAuth });
    }
  }
  componentWillUnmount() {
    this.isOpened = false;
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to="/unauthorized" />
          )
        }
      />
    );
  }
}

export default withApollo(ProtectedRoute);
