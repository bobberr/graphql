const graphqlMsgFromError = err => {
  if (!err.graphQLErrors) {
    throw new Error("There is no graphql errors in error object");
  }
  return err.graphQLErrors.map(error => {
    return error.message;
  });
};

export default graphqlMsgFromError;
