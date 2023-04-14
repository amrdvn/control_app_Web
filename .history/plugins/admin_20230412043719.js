
var admin = require("firebase-admin");

var serviceAccount = require("./control-app-a014e-firebase-adminsdk-2mmmm-a3ffca7c6e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
