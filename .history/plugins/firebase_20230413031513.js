import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420",
  authDomain: "control-app-a014e.firebaseapp.com",
  projectId: "control-app-a014e",
  storageBucket: "control-app-a014e.appspot.com",
  messagingSenderId: "207916838663",
  appId: "1:207916838663:web:1e1d37565881adb32edfa2",
  measurementId: "G-HY9R61PQ7W"
  });
}

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();

// Initialize FCM object
const fcm = messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
});

export { auth, db, messaging, fcm };
