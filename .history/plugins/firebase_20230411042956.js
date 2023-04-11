import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

const firebaseConfig = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>',
    appId: '<your-app-id>'
}

// Check if firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
