const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendPushNotification = functions.firestore
  .document("users/{uid}")
  .onUpdate(async (change, context) => {
    const uid = context.params.uid;
    const tokenDoc = await admin.firestore().doc(`users/${uid}/token`).get();
    const token = tokenDoc.data().token;
    const message = {
      notification: {
        title: "New Notification",
        body: "You have a new notification"
      },
      token: token
    };
    await admin.messaging().send(message);
  });
