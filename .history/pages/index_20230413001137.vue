<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="submit">
        <label for="baslik">Başlık:</label><br>
        <input type="text" id="baslik" name="baslik" v-model="title"><br><br>
        <label for="icerik">İçerik:</label><br>
        <textarea id="icerik" name="icerik" v-model="body"></textarea><br><br>
        <button class="btn" type="submit">Bildirim Gönder</button>
      </form>
    </div>
    <oturumacik />
    <footerkismi />
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'


export default {
  components: {
    menulist,
    oturumacik,
    footerkismi
  },
  data() {
    return {
      title: '',
      body: ''
    }
  },
  created() {
    // Initialize Firebase app
    firebase.initializeApp({
      // your Firebase config object
    })
  },
  methods: {
    async submit() {
      // Check if user is authenticated
      const user = firebase.auth().currentUser
      if (!user) {
        console.log('User is not authenticated')
        return
      }
      
      // Get user's UID and token
      const uid = user.uid
      const tokenDoc = await firebase.firestore().collection('users').doc(uid).get()
      const token = tokenDoc.data().token
      
      // Send push notification using FCM SDK
      const messaging = firebase.messaging()
      messaging.getToken({ vapidKey: 'your_vapid_key' }).then((currentToken) => {
        messaging.requestPermission().then(() => {
          messaging.getToken().then((newToken) => {
            // Send notification
            fetch('https://fcm.googleapis.com/fcm/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=your_server_key'
              },
              body: JSON.stringify({
                to: token,
                notification: {
                  title: this.title,
                  body: this.body
                }
              })
            })
          })
        })
      })
    }
  }
}
</script>
