import React from 'react';
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { history } from "../App";

const QUERY = gql`
	query test {
		getItem
	}
`;

class AdminPanel extends React.Component {
	 componentDidMount() {
		this.props.client.query({query: QUERY})
			.then(data => {
				if(data.getItem === 'unauthorized') {
					console.log('fires', data.getItem);
					history.push('/unauthorized');
				}
			});
	}
	render() {
		return (
			<div>data fetched</div>
		);
	}
};

export default withApollo(AdminPanel);