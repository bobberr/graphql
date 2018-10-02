import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers } from "../clientResolver/clientResolver";

const cache = new InMemoryCache();
const stateLink = withClientState({resolvers, cache, defaults});

const adminClient = new ApolloClient({
	link: ApolloLink.from([stateLink, new HttpLink({
		uri: "http://localhost:3001/admin/graphql",
		credentials: "include"
	})]),
	cache: cache
});

export default adminClient;
