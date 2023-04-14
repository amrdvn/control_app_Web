import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
const db = firebase.firestore()

let messaging = null;

if (typeof window !== 'undefined' && firebase.messaging.isSupported()) {
  messaging = firebase.messaging();

  messaging.getToken({ vapidKey: 'YOUR_VAPID_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Got FCM token:', currentToken);
      } else {
        console.log('No FCM token available.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

  messaging.onMessage((payload) => {
    console.log('Received FCM message:', payload);
  });
}

export { firebase, auth, db, messaging };
