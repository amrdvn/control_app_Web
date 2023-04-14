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
import { firebase } from '~/plugins/firebase.js'
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
      const user = firebase.auth().currentUser
      if (!user) {
        // User is not logged in, do something else
        return
      }

      // Get the token from Firestore
      const tokenDoc = await firebase.firestore().doc(`users/${user.uid}/token`).get()
      const token = tokenDoc.data().token

      // Send the push notification using Firebase Cloud Messaging
      await firebase.messaging().send({
        token,
        notification: {
          title: this.title,
          body: this.body
        }
      })

      // Reset the form
      this.title = ''
      this.body = ''
    }
  }
}
</script>
