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
import { auth, db, messaging } from '~/plugins/firebase'

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
        const currentUser = auth.currentUser
        if (!currentUser) {
          // User is not logged in
          return
        }

        // Get the user's uid and token from Firestore
        const uid = currentUser.uid
        const userDoc = await db.collection('users').doc(uid).get()
        const token = userDoc.data().token

        // Send push notification
        await messaging.requestPermission()
        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          token: token
        }
        await messaging.send(message)

        // Reset form
        this.title = ''
        this.body = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
