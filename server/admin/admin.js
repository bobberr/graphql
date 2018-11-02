const uuidv4 = require("uuid/v4");
const BrandModel = require("../models/BrandModel");
const { PubSub } = require("apollo-server-express");
const subscriptionEvents = require("./subscriptionEvents");
const fs = require("fs");

const pubSub = new PubSub();

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
    addBrand(name: String!, file: Upload!): Brand
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
        session.userId = uuidv4();
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
    addBrand: async (obj, { name, file }, req) => {
      // Awaiting readable stream and filename from request
      const { stream, filename } = await file.originFileObj;

      // RegExp for extracting extension from filename
      const extensionRegExp = /(?:\.([^.]+))?$/;
      const extension = extensionRegExp.exec(filename)[1];

      // Write to file from stream
      const fileToWrite = fs.createWriteStream(
        `../img/brandsLogos/${name}.${extension}`
      );
      stream.pipe(fileToWrite);

      // Creating new brand
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
