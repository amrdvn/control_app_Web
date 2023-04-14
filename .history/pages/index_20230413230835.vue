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
      body: '',
      token: 'fjl-ZNNLQ1-crw5KiLrMF3:APA91bFOIJsdUNjqX52B8zAP1gxg3tSRmUC_KexJaIYfTqhKGq9EJwaTvvHsXtsh7vWVm-kS-yngHEQ0kxkcji_lC1UnV5jiOTF5LaiCJzz6QRAnZylh4HWFSJPEqiwchu_60py72L9_'
    }
  },
  methods: {
    submit() {
      const notification = {
        title: this.title,
        body: this.body,
        click_action: 'https://yourwebsite.com/'
      }

      const message = {
        notification,
        token: this.token
      }

      axios.post('https://fcm.googleapis.com/fcm/send', message, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAMGjPLwc:APA91bHSArapukUu4ZTeZrMTrrhrNcCuZ7aMaW0k_8o4bUmDNSdl5E2lLM_RYl0ReQ-QtNFuRWUsfT3GXbmmGtP6AMyK2xXzZEFbOiFQa0ZLyBB7F1q0WAgaQs7uCKM_N0Lq_EsJ-2IH'
        }
      })
      .then(response => {
        console.log('Notification sent successfully:', response.data)
        this.title = ''
        this.body = ''
      })
      .catch(error => {
        console.error('Error sending notification:', error)
      })
    }
  }
}
</script>
