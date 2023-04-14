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
import { auth, messaging } from '~/plugins/firebase.js'
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
    async submitForm() {
      const currentUser = auth.currentUser
      if (!currentUser) {
        console.error('No current user')
        return
      }

      try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get()
        const token = userDoc.get('token')
        if (!token) {
          console.error('No token found for user')
          return
        }

        console.log('Sending notification to token:', token)

        await messaging.requestPermission()
        await messaging.getToken()
        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: token,
            notification: {
              title: this.title,
              body: this.message
            }
          })
        })
        console.log('Notification sent:', await response.json())
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    }
  }
}
</script>