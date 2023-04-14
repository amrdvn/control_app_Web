
var admin = require("firebase-admin");

var serviceAccount = require("./control-app-a014e-firebase-adminsdk-2mmmm-a3ffca7c6e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This registration token comes from the client FCM SDKs.
const registrationToken = 'fjl-ZNNLQ1-crw5KiLrMF3:APA91bFOIJsdUNjqX52B8zAP1gxg3tSRmUC_KexJaIYfTqhKGq9EJwaTvvHsXtsh7vWVm-kS-yngHEQ0kxkcji_lC1UnV5jiOTF5LaiCJzz6QRAnZylh4HWFSJPEqiwchu_60py72L9_';

const message = {
  notification:{
    title:"Deneme Title",
    body:"Deneme body"
  },
  webpush: {
    fcmOptions: {
      link: '/?breakingnews'
    }
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
