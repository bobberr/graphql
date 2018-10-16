import React from "react";
import gql from "graphql-tag";
import { history } from "../App";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

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
  inputAfter: {
    "&:after": {
      borderBottomColor: "#2590EC"
    }
  },
  inputLabel: {
    color: "white",
    "&$inputLabelFocused": {
      color: "white"
    }
  },
  inputLabelFocused: {},
  inputRoot: {
    color: "white"
  },
  formControl: {
    marginBottom: "10px"
  },
  rightIcon: {
    marginRight: "20px"
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
          <Typography className={classes.title} component="h2" variant="h4">
            Log In
          </Typography>
          <form onSubmit={this._submitLogIn} className={classes.form}>
            <FormControl
              classes={{
                root: classes.formControl
              }}
              required={true}
            >
              <InputLabel
                FormLabelClasses={{
                  root: classes.inputLabel,
                  focused: classes.inputLabelFocused
                }}
              >
                Admin login
              </InputLabel>
              <Input
                onChange={this._changeLogIn}
                type="text"
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputAfter
                }}
              />
            </FormControl>
            <FormControl
              classes={{
                root: classes.formControl
              }}
              required={true}
            >
              <InputLabel
                FormLabelClasses={{
                  root: classes.inputLabel,
                  focused: classes.inputLabelFocused
                }}
              >
                Admin password
              </InputLabel>
              <Input
                onChange={this._changePassword}
                type="password"
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputAfter
                }}
              />
            </FormControl>
            <button>Log In</button>
            <Button variant="contained" color="primary">
              Log In
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
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
