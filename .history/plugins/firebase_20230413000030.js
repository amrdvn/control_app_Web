import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420",
  authDomain: "control-app-a014e.firebaseapp.com",
  projectId: "control-app-a014e",
  storageBucket: "control-app-a014e.appspot.com",
  messagingSenderId: "207916838663",
  appId: "1:207916838663:web:1e1d37565881adb32edfa2",
  measurementId: "G-HY9R61PQ7W"
};

// Firebase SDK'yı projenize ekleyin
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Messaging örneğini alın
const messaging = firebase.messaging()

// İzin isteme işlemini başlatın
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.')
}).catch((err) => {
  console.log('Unable to get permission to notify.', err)
})

// Token refresh işlemini dinleyin
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.', refreshedToken)
    // Token'ı sunucunuza gönderin
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token.', err)
  })
})

export { messaging }