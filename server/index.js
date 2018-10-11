var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var { makeExecutableSchema } = require("graphql-tools");
var cors = require("cors");
var port = process.env.PORT || 3001;
var mongoose = require("mongoose");
var adminTypeDefs = require("./admin/admin").adminTypeDefs;
var rootAdmin = require("./admin/admin").rootAdmin;
var session = require("express-session");
var bodyParser = require("body-parser");
var secretObject = require("./admin/secrets");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(
  secretObject.dbconnection,
  { useNewUrlParser: true }
);

var app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
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

var adminSchema = makeExecutableSchema({
  typeDefs: adminTypeDefs,
  resolvers: rootAdmin
});

app.use(
  "/graphql",
  bodyParser.json(),
  (req, res, next) => {
    next();
  },
  graphqlHTTP({
    schema: adminSchema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
