// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";



const firebaseConfig = {
  apiKey: "AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420",
  authDomain: "control-app-a014e.firebaseapp.com",
  projectId: "control-app-a014e",
  storageBucket: "control-app-a014e.appspot.com",
  messagingSenderId: "207916838663",
  appId: "1:207916838663:web:1e1d37565881adb32edfa2",
  measurementId: "G-HY9R61PQ7W"
};

// Initialize Firebase
const apps=getApps();
const app= !apps.length ? initializeApp(firebaseConfig): apps[0]
const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const messaging=getMessaging(app)