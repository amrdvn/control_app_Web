import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
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
