import React, { Component } from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminDashboard from "./componentsAdmin/AdminDashboard";
import NoPermissions from "./components/NoPermissions";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

// history for react router
export const history = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <ApolloProvider client={adminClient}>
            <Router history={history}>
              <div>
                <Route exact path="/admin-login" component={AdminLogin} />
                <Route exact path="/unauthorized" component={NoPermissions} />
                <Route
                  exact
                  path="/admin-dashboard"
                  component={AdminDashboard}
                />
              </div>
            </Router>
          </ApolloProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
