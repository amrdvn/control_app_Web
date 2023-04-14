
var admin = require("firebase-admin");

var serviceAccount = require("./control-app-a014e-firebase-adminsdk-2mmmm-a3ffca7c6e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This registration token comes from the client FCM SDKs.
const registrationToken = 'YOUR_REGISTRATION_TOKEN';

const message = {
  notification:{
    title:"Deneme Title",
    body:"Deneme body"
  }, 
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
getMessaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
