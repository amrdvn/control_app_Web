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
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

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
      token: '',
    }
  },
  async mounted() {
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging()
      try {
        const token = await messaging.getToken()
        this.token = token
      } catch (error) {
        console.log('Hata:', error)
      }
    }
  },
  methods: {
    async submit() {
      const db = firebase.firestore()
      const uid = firebase.auth().currentUser.uid
      const userRef = db.collection('users').doc(uid)

      try {
        const userDoc = await userRef.get()
        const token = userDoc.data().token

        const messaging = firebase.messaging()
        messaging.usePublicVapidKey(process.env.PUBLIC_VAPID_KEY)
        await messaging.send({
          to: token,
          notification: {
            title: this.title,
            body: this.body,
          },
        })
        console.log('Bildirim gönderildi')
      } catch (error) {
        console.log('Hata:', error)
      }
    },
  },
}
</script>
