import React, { Component } from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminDashboard from "./componentsAdmin/AdminDashboard";
import NoPermissions from "./components/NoPermissions";

// history for react router
export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={adminClient}>
          <Router history={history}>
            <div>
              <Route exact path="/admin-login" component={AdminLogin} />
              <Route exact path="/unauthorized" component={NoPermissions} />
              <Route exact path="/admin-dashboard" component={AdminDashboard} />
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
