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
      const user = await firebase.auth().currentUser
      const token = await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => doc.data().token)

      const messaging = firebase.messaging()

      // Public Vapid Key'ini buraya girin.
      const publicVapidKey = 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8'

      messaging.usePublicVapidKey(publicVapidKey)
      messaging.requestPermission().then(() => {
        console.log('Permission granted!')
        return messaging.getToken()
      }).then(async (deviceToken) => {
        console.log('Token:', deviceToken)

        const payload = {
          notification: {
            title: this.title,
            body: this.body,
            icon: '/icon.png',
            click_action: 'https://example.com'
          }
        }

        const options = {
          priority: 'high',
          timeToLive: 60 * 60 * 24
        }

        try {
          await messaging.sendToDevice(token, payload, options)
          console.log('Notification sent successfully')
        } catch (error) {
          console.log('Error sending notification:', error)
        }
      }).catch((error) => {
        console.log('Permission denied:', error)
      })
    }
  }
}
</script>
