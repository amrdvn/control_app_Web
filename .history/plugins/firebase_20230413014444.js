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

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

if (typeof window !== 'undefined') {
  // Firebase Messaging code goes here
}

export { firebase, messaging };