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
    addBrand(
      brandName: String!, 
      file: Upload!, 
      brandCountry: String!
      startYear: Int!
      endYear: Int!
    ): Brand
  }

  type Subscription {
    brandAdded: Brand
  }

  type Brand {
    _id: ID
    brandName: String
    errorCode: Int
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
    addBrand: async (
      obj,
      { brandName, file, brandCountry, startYear, endYear },
      req
    ) => {
      // Awaiting readable stream and filename from request
      const { stream, filename } = await file.originFileObj;

      // RegExp for extracting extension from filename
      const extensionRegExp = /(?:\.([^.]+))?$/;
      const extension = extensionRegExp.exec(filename)[1];

      // Write to file from stream, relative path according to index.js server file
      const fileToWrite = fs.createWriteStream(
        `../img/brandsLogos/${brandName}.${extension}`
      );
      stream.pipe(fileToWrite);

      // Creating new brand
      const newBrand = new BrandModel({
        brandName,
        brandCountry,
        startYear,
        endYear
      });
      try {
        await newBrand.save();
      } catch (err) {
        if (err.code === 11000) {
          return new Error("Brand duplication");
        }
        return err;
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
