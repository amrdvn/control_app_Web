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
import firebase from '~/plugins/firebase.js'

import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'
import firebase from '~/plugins/firebase.js'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi
  },
  data() {
    return {
      title: '',
      body: '',
      token: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.token = doc.data().token
            }
          })
      }
    })
  },
  methods: {
    submit() {
      var admin = require('firebase-admin')
      var serviceAccount = require('./control-app-a014e-firebase-adminsdk-2mmmm-a3ffca7c6e.json')
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
      const message = {
        notification: {
          title: this.title,
          body: this.body
        },
        webpush: {
          fcmOptions: {
            link: '/?breakingnews'
          }
        },
        token: this.token
      }
      admin
        .messaging()
        .send(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response)
          alert('Bildirim gönderildi!')
        })
        .catch((error) => {
          console.log('Error sending message:', error)
          alert('Bildirim gönderilemedi!')
        })
    }
  }
}
</script>
