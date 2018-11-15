// import gql from 'graphql-tag';

export const defaults = {
  activeBrand: {
    __typename: "Brand"
  }
};

export const resolvers = {
  Mutation: {
    setActiveBrand: (obj, { _id, brandName }, { cache }) => {
      const data = {
        activeBrand: {
          _id,
          brandName,
          __typename: "Brand"
        }
      };
      cache.writeData({ data });
      return null;
    }
  },
  Query: {}
};
