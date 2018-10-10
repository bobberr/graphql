import React, { Component } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminPanel from "./componentsAdmin/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={adminClient}>
          <Router history={history}>
            <div>
              <Route path="/admin-login" component={AdminLogin} exact />
              <ProtectedRoute
                path="/admin-panel"
                component={AdminPanel}
                exact
              />
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
