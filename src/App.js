import React, { Component } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminDashboard from "./componentsAdmin/AdminDashboard";
import NoPermissions from "./components/NoPermissions";
import NotFound from "./components/NotFound";

// history for react router
export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={adminClient}>
          <Router history={history}>
            <Switch>
              <Route exact path="/admin-login" component={AdminLogin} />
              <Route exact path="/unauthorized" component={NoPermissions} />
              <Route path="/admin-dashboard" component={AdminDashboard} />
              <Route path="/*" component={NotFound} />
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
