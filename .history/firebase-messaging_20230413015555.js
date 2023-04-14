importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420",
  authDomain: "control-app-a014e.firebaseapp.com",
  projectId: "control-app-a014e",
  storageBucket: "control-app-a014e.appspot.com",
  messagingSenderId: "207916838663",
  appId: "1:207916838663:web:1e1d37565881adb32edfa2",
  measurementId: "G-HY9R61PQ7W"
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

self.addEventListener('push', (event) => {
  const data = event.data.json()
  const { title, body } = data.notification
  self.registration.showNotification(title, {
    body
  })
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('YOUR_URL'))
})

self.addEventListener('activate', () => {
  console.log('Service worker activated')
})
