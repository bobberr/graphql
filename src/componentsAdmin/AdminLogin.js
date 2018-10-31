import React from "react";
import gql from "graphql-tag";
import { history } from "../App";
import { withApollo } from "react-apollo";
import { Card } from "antd";
import PropTypes from "prop-types";
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
    border: "2px solid #1F8EF1",
    borderRadius: "10px"
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
    textAlign: "center",
    marginBottom: "5px"
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
  }
};

class AdminLogin extends React.Component {
  state = {};

  // Runs mutation on submiting form
  _submitLogIn = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const queryResult = await this.props.client.query({
          query: logInAdminQuery,
          variables: {
            login: values.login,
            password: values.password
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
          <h4 className={classes.title}>Welcome, admin.</h4>
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
                  type="password"
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
              Log In
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

// Initializing antd Form, injecting styles and consuming apollo client
export default withApollo(injectSheet(styles)(Form.create()(AdminLogin)));
