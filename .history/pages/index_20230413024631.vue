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
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getMessaging, getToken } from 'firebase/messaging'

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
      // Get the Firestore and Messaging instances
      const db = getFirestore()
      const messaging = getMessaging()

      try {
        // Get the logged in user's uid
        const user = this.$auth.user
        const uid = user.uid

        // Get the token information from Firestore
        const tokenRef = doc(db, 'users', uid, 'token')
        const tokenSnapshot = await getDoc(tokenRef)
        const token = tokenSnapshot.data().value

        // Send the push notification
        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          token: token
        }
        const response = await messaging.send(message)

        console.log('Push notification sent successfully', response)
      } catch (error) {
        console.error('Error sending push notification', error)
      }
    }
  }
}
</script>
