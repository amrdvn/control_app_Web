import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420',
    authDomain: 'control-app-a014e.firebaseapp.com',
    projectId: 'control-app-a014e',
    storageBucket: 'control-app-a014e.appspot.com',
    messagingSenderId: '207916838663',
    appId: '1:207916838663:web:1e1d37565881adb32edfa2',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // auth ve firestore objelerini oluşturun
  export const auth = firebase.auth();  const firestore = firebase.firestore();
  
