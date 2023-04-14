importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
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
