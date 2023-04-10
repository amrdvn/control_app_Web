import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  const config = {
    // Firebase yapılandırması
  }
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
