importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
});

const messaging = firebase.messaging();
