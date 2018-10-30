import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { defaults, resolvers } from "../clientResolver/clientResolver";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache();
const uri = "http://localhost:3001/graphql";

const stateLink = withClientState({ resolvers, cache, defaults });

const uploadLink = createUploadLink({ uri });

const httpLinkWithState = ApolloLink.from([
  stateLink,
  uploadLink,
  new HttpLink({
    uri,
    credentials: "include"
  })
]);
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithState
);

const adminClient = new ApolloClient({
  link,
  cache: cache
});

export default adminClient;
