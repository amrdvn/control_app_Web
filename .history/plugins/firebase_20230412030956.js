import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420',
    authDomain: 'control-app-a014e.firebaseapp.com',
    projectId: 'control-app-a014e',
    storageBucket: 'control-app-a014e.appspot.com',
    messagingSenderId: '207916838663',
    appId: '1:207916838663:web:1e1d37565881adb32edfa2',
  }
  firebase.initializeApp(firebaseConfig)
}

let messaging

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey('your_public_vapid_key')
}

export { firebase, messaging }