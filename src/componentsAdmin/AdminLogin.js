import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { history } from "../App";

const logInAdminMutation = gql`
  mutation logInAdmin($login: String!, $password: String!) {
    adminLogIn(login: $login, password: $password)
  }
`;

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this._changeLogIn = this._changeLogIn.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this._onCompletedMutation = this._onCompletedMutation.bind(this);
    this.state = {};
  }

  //	Inputing login to state
  _changeLogIn(e) {
    this.setState({ login: e.target.value });
  }

  // Inputing password to state
  _changePassword(e) {
    this.setState({ password: e.target.value });
  }

  // Runs mutation on submiting form
  _submitLogIn(logInAdminMutation, e) {
    e.preventDefault();
    logInAdminMutation({
      variables: {
        login: this.state.login,
        password: this.state.password
      }
    });
  }

  // After successful mutation
  _onCompletedMutation(data) {
    if (data.adminLogIn) {
      history.push("/admin-panel");
    } else {
      this.setState({ logInError: true });
    }
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={logInAdminMutation}
          onCompleted={this._onCompletedMutation}
        >
          {logInAdminMutation => {
            return (
              <form onSubmit={this._submitLogIn.bind(this, logInAdminMutation)}>
                <input type="text" onChange={this._changeLogIn} />
                <input type="password" onChange={this._changePassword} />
                <button>Log In</button>
              </form>
            );
          }}
        </Mutation>
        {this.state.logInError && <p>Wrong login or password</p>}
      </div>
    );
  }
}

export default AdminLogin;
