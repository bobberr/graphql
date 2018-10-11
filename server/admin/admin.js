var uudiv4 = require("uuid/v4");

const checkSession = session => {
  return session.userId || false;
};

module.exports.adminTypeDefs = adminTypeDefs = `
  type Query {
    adminLogIn(login: String, password: String): Boolean
    checkAuth: Boolean
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
    }
  },
  Mutation: {
    logOutMutation: (obj, arg, req) => {
      req.session.destroy();
      return true;
    }
  }
};
