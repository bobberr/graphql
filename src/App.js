import React, { Component } from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminDashboard from "./componentsAdmin/AdminDashboard";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={adminClient}>
          <Router history={history}>
            <div>
              <Route path="/admin-login" component={AdminLogin} exact />
              <Route path="/admin-dashboard" component={AdminDashboard} exact />
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
