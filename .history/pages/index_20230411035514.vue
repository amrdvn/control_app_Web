<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="sendMessage">
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
import firebase from 'firebase/compat/app';
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
  methods: {
    async sendMessage() {
      const messaging = firebase.messaging()
      try {
        await messaging.requestPermission()
        const token = await messaging.getToken()
        console.log('Token:', token)

        const notificationPayload = {
          notification: {
            title: this.title,
            body: this.body,
            click_action: '/'
          },
          to: token
        }
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${process.env.FCM_SERVER_KEY}`
          },
          body: JSON.stringify(notificationPayload)
        })
        const data = await response.json()
        console.log('Bildirim gönderildi:', data)
      } catch (error) {
        console.error('Bildirim gönderilemedi:', error)
      }
    }
  }
}
</script>

<style>
</style>
