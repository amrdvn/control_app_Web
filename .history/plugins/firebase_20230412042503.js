import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: 'AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420',
    authDomain: 'control-app-a014e.firebaseapp.com',
    projectId: 'control-app-a014e',
    storageBucket: 'control-app-a014e.appspot.com',
    messagingSenderId: '207916838663',
    appId: '1:207916838663:web:1e1d37565881adb32edfa2',
}

// Check if firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export { firebase }
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' }).then((currentToken) => {
  if (currentToken) {
    console.log("Token is :",currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});