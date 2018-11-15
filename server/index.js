const express = require("express");
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const adminTypeDefs = require("./admin/admin").adminTypeDefs;
const rootAdmin = require("./admin/admin").rootAdmin;
const session = require("express-session");
const secretObject = require("./admin/secrets");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const sessionStore = require("./session-store");

mongoose.connect(
  secretObject.dbconnection,
  { useNewUrlParser: true }
);

const app = express();

app.use(
  session({
    name: "session_id",
    secret: secretObject.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7200000
    }
  })
);

const apolloServer = new ApolloServer({
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

const httpServer = http.createServer(app);

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
