import { firebase } from './firebase'

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey('BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8')
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      messaging.getToken().then(token => {
        console.log(token)
      })
    }
  })
}
