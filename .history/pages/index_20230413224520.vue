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
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging' // import messaging from firebase

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
      body: '',
      token: 'fjl-ZNNLQ1-crw5KiLrMF3:APA91bFOIJsdUNjqX52B8zAP1gxg3tSRmUC_KexJaIYfTqhKGq9EJwaTvvHsXtsh7vWVm-kS-yngHEQ0kxkcji_lC1UnV5jiOTF5LaiCJzz6QRAnZylh4HWFSJPEqiwchu_60py72L9_'
    }
  },
  methods: {
    async submit() {
      try {
        // Initialize Firebase and get a reference to the messaging instance
        const firebaseConfig = {
          apiKey: '<your-api-key>',
          authDomain: '<your-auth-domain>',
          projectId: '<your-project-id>',
          storageBucket: '<your-storage-bucket>',
          messagingSenderId: '<your-messaging-sender-id>',
          appId: '<your-app-id>',
          measurementId: '<your-measurement-id>'
        }
        firebase.initializeApp(firebaseConfig)
        const messaging = firebase.messaging()

        // Get the current registration token
        const currentToken = await messaging.getToken()
        console.log('Current token:', currentToken)

        // Send a notification using axios
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$config.FCM_VAPID_KEY}`
        }
        const data = {
          'message': {
            'notification': {
              'title': this.title,
              'body': this.body
            },
            'token': this.token
          }
        }
        const response = await axios.post('https://fcm.googleapis.com/v1/projects/<your-project-id>/messages:send', data, {
          headers: headers
        })
        console.log('FCM response:', response)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
