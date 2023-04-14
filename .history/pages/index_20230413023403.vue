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

  mmethods: {
  submit() {
    // Get the current user's UID and token
    const uid = auth.currentUser.uid;
    auth.currentUser.getIdToken().then((token) => {
      // Save the token in Firestore under /users/{uid}/token
      const db = firebase.firestore();
      db.collection('users').doc(uid).set({
        token: token
      }, { merge: true }).then(() => {
        console.log('Token saved to Firestore')
      }).catch((err) => {
        console.error('Error saving token to Firestore:', err)
      })

      // Send a request to your server to send the push notification
      fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          notification: {
            title: this.title,
            body: this.body
          }
        })
      }).then(() => {
        console.log('Push notification sent')
      }).catch((err) => {
        console.error('Error sending push notification:', err)
      })
    })
  }
}
}
</script>
