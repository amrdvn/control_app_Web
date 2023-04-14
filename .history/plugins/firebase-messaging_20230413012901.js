import { firebase } from './firebase'

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey('YOUR_PUBLIC_VAPID_KEY')
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      messaging.getToken().then(token => {
        console.log(token)
      })
    }
  })
}
