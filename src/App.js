import React, { Component } from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import adminClient from "./apolloClients/admin-client";
import AdminLogin from "./componentsAdmin/AdminLogin";
import AdminPanel from "./componentsAdmin/AdminPanel";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<div>
				<ApolloProvider client={adminClient}>
					<Router history={history}>
						<div>
							<Route exact path="/admin-login" component={AdminLogin} />
							<Route exact path="/admin-panel" component={AdminPanel} />
						</div>
					</Router>
				</ApolloProvider>
			</div>
		);
	}
}

export default App;
