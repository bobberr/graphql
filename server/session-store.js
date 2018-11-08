const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const secretObject = require("./admin/secrets");

const sessionStore = new MongoDBStore({
  uri: secretObject.dbconnection,
  collection: "sessions"
});

sessionStore.on("connected", () => {
  sessionStore.client;
});

sessionStore.on("error", err => {
  throw err;
});

module.exports = sessionStore;
