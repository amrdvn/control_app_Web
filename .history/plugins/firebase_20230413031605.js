import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420",
  authDomain: "control-app-a014e.firebaseapp.com",
  projectId: "control-app-a014e",
  storageBucket: "control-app-a014e.appspot.com",
  messagingSenderId: "207916838663",
  appId: "1:207916838663:web:1e1d37565881adb32edfa2",
  measurementId: "G-HY9R61PQ7W"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
const db = firebase.firestore()

let messaging = null;

if (typeof window !== 'undefined' && firebase.messaging.isSupported()) {
  messaging = firebase.messaging();

  messaging.getToken({ vapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' })
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
  const fcm = messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
  });
}

export { firebase, auth, db, messaging };
