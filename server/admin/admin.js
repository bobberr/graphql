var uudiv4 = require("uuid/v4");
var BrandModel = require("../models/BrandModel");
var { PubSub } = require("apollo-server-express");
var subscriptionEvents = require("./subscriptionEvents");

var pubSub = new PubSub();

module.exports.adminTypeDefs = adminTypeDefs = `
  type Query {
    adminLogIn(login: String!, password: String!): Boolean
    checkAuth: Boolean
    getAllBrands: [Brand]
  }

  type Mutation {
    addBrand(name: String!): Brand
  }

  type Subscription {
    brandAdded: Brand
  }

  type Brand {
    id: ID
    name: String
  }
  
  type Test {
  	test: Boolean
  }
`;

module.exports.rootAdmin = rootAdmin = {
  Query: {
    checkAuth: (obj, arg, { session }) => {
      return session.userId ? true : false;
    },
    adminLogIn: (obj, arg, { session }) => {
      if (arg.login === "admin" && arg.password === "admin") {
        session.userId = uudiv4();
        return true;
      } else {
        return false;
      }
    },
    getAllBrands: (obj, arg, req) => {
      return BrandModel.find({});
    }
  },
  Mutation: {
    addBrand: (obj, { name }, req) => {
      req.session.destroy();
      return true;
    }
  },
  Subscription: {
    brandAdded: {
      subscribe: () => pubSub.asyncIterator([subscriptionEvents.BRAND_ADDED])
    }
  }
};
