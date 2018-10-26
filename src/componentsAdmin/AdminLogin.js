import React from "react";
import gql from "graphql-tag";
import { history } from "../App";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Input, Form, Button } from "antd";
import injectSheet from "react-jss";

const FormItem = Form.Item;

const logInAdminQuery = gql`
  query logInAdmin($login: String!, $password: String!) {
    adminLogIn(login: $login, password: $password)
  }
`;

const styles = {
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
  visibleError: {
    opacity: 1
  },
  hiddenError: {
    opacity: 0
  },
  error: {
    color: "#CA52E4",
    transition: "opacity .2s linear",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 100px"
  },
  inputRoot: {
    color: "white",
    backgroundColor: "transparent"
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
};

class AdminLogin extends React.Component {
  state = {};

  // Runs mutation on submiting form
  _submitLogIn = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, value) => {
      if (!err) {
        const queryResult = await this.props.client.query({
          query: logInAdminQuery,
          variables: {
            login: value.login,
            password: value.password
          }
        });
        queryResult.data.adminLogIn
          ? history.push("/admin-dashboard")
          : this.setState({ logInError: true });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography className={classes.title} component="h2">
            Welcome, admin.
          </Typography>
          <Form onSubmit={this._submitLogIn} className={classes.form}>
            <FormItem>
              {getFieldDecorator("login", {
                rules: [
                  {
                    required: true,
                    message: "Please input your login"
                  }
                ]
              })(
                <Input
                  placeholder="Admin login"
                  className={classes.inputRoot}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password"
                  }
                ]
              })(
                <Input
                  placeholder="Admin password"
                  className={classes.inputRoot}
                />
              )}
            </FormItem>
            <p
              className={[
                classes.error,
                this.state.logInError
                  ? classes.visibleError
                  : classes.hiddenError
              ].join(" ")}
            >
              You entered wrong login or password
            </p>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withApollo(injectSheet(styles)(Form.create()(AdminLogin)));
