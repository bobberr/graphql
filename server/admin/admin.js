var uudiv4 = require("uuid/v4");
var BrandModel = require("../models/BrandModel");
var { PubSub } = require("apollo-server-express");
var subscriptionEvents = require("./subscriptionEvents");

var pubSub = new PubSub();

module.exports.adminTypeDefs = adminTypeDefs = `
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

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
    _id: ID
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
    addBrand: async (obj, { name }, req) => {
      const newBrand = new BrandModel({ name });
      try {
        await newBrand.save();
      } catch (err) {
        console.log(err);
      }
      pubSub.publish(subscriptionEvents.BRAND_ADDED, { brandAdded: newBrand });
      return newBrand;
    }
  },
  Subscription: {
    brandAdded: {
      subscribe: () => pubSub.asyncIterator([subscriptionEvents.BRAND_ADDED])
    }
  }
};
