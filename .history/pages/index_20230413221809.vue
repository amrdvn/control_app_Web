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
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'
import axios from 'axios'

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
      // Kullanıcının oturum açtığını varsayalım
      const user = firebase.auth().currentUser

      // Kullanıcının uid'sini alın
      const uid = user.uid

      // Firestore'dan kullanıcının belirtecini alın
      const tokenDoc = await firebase.firestore().doc(`users/${uid}/token`).get()
      const token = tokenDoc.data().token

      // Bildirim gövdesini oluşturun
      const data = {
        notification: {
          title: this.title,
          body: this.body
        },
        token: token
      }

      // Firebase Cloud Messaging API'sine HTTP POST isteği gönderin
      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=YOUR_SERVER_KEY' // YOUR_SERVER_KEY yerine kendi sunucu anahtarınızı ekleyin
        }
      })

      // Formu sıfırlayın
      this.title = ''
      this.body = ''
    }
  }
}
</script>
