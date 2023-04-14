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
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
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
        const currentUser = firebase.auth().currentUser
        const tokenRef = firebase.firestore().doc(`users/${currentUser.uid}`)
        const tokenSnapshot = await tokenRef.get()
        const token = tokenSnapshot.data().token
        const messaging = firebase.messaging()
        messaging.getToken();
        await messaging.requestPermission()
        await messaging.getToken()
        await messaging.send({
          to: token,
          notification: {
            title: this.title,
            body: this.body,
            icon: '<PATH_TO_NOTIFICATION_ICON>'
          }
        })
        this.title = ''
        this.body = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
