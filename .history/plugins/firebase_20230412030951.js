import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

if (!firebase.apps.length) {
  const firebaseConfig = {
    // firebase configuration options
  }
  firebase.initializeApp(firebaseConfig)
}

let messaging

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey('your_public_vapid_key')
}

export { firebase, messaging }