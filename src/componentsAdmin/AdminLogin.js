import React from "react";
import gql from "graphql-tag";
import { history } from "../App";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import PropTypes from "prop-types";

const logInAdminQuery = gql`
  query logInAdmin($login: String!, $password: String!) {
    adminLogIn(login: $login, password: $password)
  }
`;

const styles = theme => ({
  container: {
    height: "100vh",
    background: "#232431"
  },
  card: {
    maxWidth: "500px"
  }
});

class AdminLogin extends React.Component {
  state = {};

  //	Inputing login to state
  _changeLogIn = e => {
    this.setState({ login: e.target.value });
  };

  // Inputing password to state
  _changePassword = e => {
    this.setState({ password: e.target.value });
  };

  // Runs mutation on submiting form
  _submitLogIn = async e => {
    e.preventDefault();
    const queryResult = await this.props.client.query({
      query: logInAdminQuery,
      variables: {
        login: this.state.login,
        password: this.state.password
      }
    });
    queryResult.data.adminLogIn
      ? history.push("/admin-dashboard")
      : this.setState({ logInError: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <form onSubmit={this._submitLogIn}>
            <input type="text" onChange={this._changeLogIn} />
            <input type="password" onChange={this._changePassword} />
            <button>Log In</button>
          </form>
        </Card>
        {this.state.logInError && <p>Wrong login or password</p>}
      </div>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withApollo(withStyles(styles)(AdminLogin));
