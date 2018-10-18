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
import FormHelperText from "@material-ui/core/FormHelperText";

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
    background: "#27293D",
    border: "2px solid #1F8EF1"
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
    color: "#9a9a9a",
    "&$inputLabelFocused": {
      color: "#9a9a9a"
    }
  },
  inputLabelFocused: {},
  inputRoot: {
    color: "#9a9a9a"
  },
  formControl: {
    marginBottom: "10px"
  },
  rightIcon: {
    marginRight: "20px"
  },
  button: {
    alignSelf: "center",
    width: "160px",
    margin: "20px 0"
  },
  helperText: {
    color: "#CA52E4"
  },
  formControlWithHelperText: {
    marginBottom: "10px",
    height: "70px"
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
            Welcome, admin.
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
                root: classes.formControlWithHelperText
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
              {this.state.logInError && (
                <FormHelperText
                  classes={{
                    root: classes.helperText
                  }}
                >
                  You probably entered wrong login or password
                </FormHelperText>
              )}
            </FormControl>
            <Button
              classes={{
                root: classes.button
              }}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Send
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withApollo(withStyles(styles)(AdminLogin));
