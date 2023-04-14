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
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import { fcm, db } from '~/plugins/firebase.js'

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
    }
  },
  methods: {
    async submit() {
      const user = firebase.auth().currentUser
      if (!user) {
        console.log('Kullanıcı oturumu açmamış.')
        return
      }

      const uid = user.uid
      const tokenDocRef = db.collection('users').doc(uid).collection('tokens').doc('token');

      const tokenDoc = await tokenDocRef.get();
      if (!tokenDoc.exists) {
        console.log('Kullanıcının cihazına ait token bulunamadı.')
        return
      }

      const token = tokenDoc.data().token
      console.log('Token:', token)

      const payload = {
        notification: {
          title: this.title,
          body: this.body,
          click_action: 'https://example.com',
        },
      }

      try {
        await fcm.sendToDevice(token, payload)
        console.log('Bildirim gönderildi.')
      } catch (error) {
        console.error('Bildirim gönderilirken hata oluştu:', error)
      }
    },
  },
}
</script>
