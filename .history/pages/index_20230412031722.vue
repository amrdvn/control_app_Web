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
import admin from 'firebase-admin'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'


const serviceAccount = require('~/service.AccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<PROJECT_ID>.firebaseio.com"
});

const firestore = firebase.firestore();

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
      const usersRef = firestore.collection('users');
      const snapshot = await usersRef.get();
      snapshot.forEach(doc => {
        const data = doc.data();
        const messagingToken = data.token;
        if(messagingToken) {
          const message = {
            notification: {
              title: this.title,
              body: this.body
            },
            token: messagingToken
          };

          admin.messaging().send(message)
            .then((response) => {
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
        }
      });
    }
  }
}
</script>
