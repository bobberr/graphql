import React from "react";
import gql from "graphql-tag";
import { history } from "../App";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";

const logInAdminQuery = gql`
  query logInAdmin($login: String!, $password: String!) {
    adminLogIn(login: $login, password: $password)
  }
`;

const styles = theme => ({
  container: {
    height: "100vh",
    background: "#232431",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "500px",
    background: "#27293D"
  },
  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: "300",
    textAlign: "center",
    margin: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 100px"
  },
  inputRoot: {
    color: "white",
    "&:after": {
      borderBottomColor: "#1F8EF1"
    }
  },
  inputLabel: {
    color: "white"
  },
  inputLabelFocused: {
    "&$focused": {
      color: "white"
    }
  }
});

class AdminLogin extends React.Component {
  state = {
    login: "",
    password: ""
  };

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
          <Typography className={classes.title} component="h2">
            Log In
          </Typography>
          <form onSubmit={this._submitLogIn} className={classes.form}>
            <InputLabel>Admin login</InputLabel>
            <Input onChange={this._changeLogIn} type="text" />
            <input type="password" onChange={this._changePassword} />
            <button>Log In</button>
          </form>
          {this.state.logInError && <p>Wrong login or password</p>}
        </Card>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withApollo(withStyles(styles)(AdminLogin));
