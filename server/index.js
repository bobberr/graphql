var express = require("express");
var { makeExecutableSchema } = require("graphql-tools");
var port = process.env.PORT || 3001;
var mongoose = require("mongoose");
var adminTypeDefs = require("./admin/admin").adminTypeDefs;
var rootAdmin = require("./admin/admin").rootAdmin;
var session = require("express-session");
// var bodyParser = require("body-parser");
var secretObject = require("./admin/secrets");
var { ApolloServer } = require("apollo-server-express");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(secretObject.dbconnection);

var app = express();

app.use(
  session({
    name: "session_id",
    secret: secretObject.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      maxAge: 7200000
    }
  })
);

var apolloServer = new ApolloServer({
  typeDefs: adminTypeDefs,
  resolvers: rootAdmin,
  context: ({ req }) => req
});

apolloServer.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    credentials: true,
    origin: "http://localhost:3000"
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
