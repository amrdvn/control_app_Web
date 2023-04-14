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
  methods: {
    async submit() {
      try {
        const user = firebase.auth().currentUser
        if (!user) {
          throw new Error('Kullanıcı oturum açmamış.')
        }
        const uid = user.uid

        const docRef = await firebase.firestore().collection('users').doc(uid).get()
        const userData = docRef.data()

        if (!userData || !userData.token) {
          throw new Error('Kullanıcının bildirim token\'ı yok.')
        }

        const token = userData.token

        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          token: token
        }

        const response = await axios.post('https://fcm.googleapis.com/v1/projects/controlapp-18c8f/messages:send', message, {
          headers: {
            Authorization: `Bearer ${process.env.FCM_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        })

        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
