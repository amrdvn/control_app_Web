importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('YOUR_URL'))
})

self.addEventListener('activate', () => {
  console.log('Service worker activated')
})
