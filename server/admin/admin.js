var uudiv4 = require("uuid/v4");
var brandModel = require("../models/BrandModel");

module.exports.adminTypeDefs = adminTypeDefs = `
  type Query {
    adminLogIn(login: String, password: String): Boolean
    checkAuth: Boolean
    getAllBrands: [Brand]
  } 

  type Brand {
    id: ID
    name: String
  }

  type Mutation {
    logOutMutation: Boolean
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
    getAllBrands: async () => {
      return await brandModel.find({});
    }
  },
  Mutation: {
    logOutMutation: (obj, arg, req) => {
      req.session.destroy();
      return true;
    }
  }
};
