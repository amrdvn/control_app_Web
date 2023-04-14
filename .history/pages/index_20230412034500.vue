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
      user: null
    }
  },
  methods: {
    submit() {
      const db = firebase.firestore();
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.log('Kullanıcı oturumu açmamış.');
        return;
      }
      db.collection('users').doc(currentUser.uid).get()
        .then(doc => {
          if (doc.exists) {
            this.token = doc.data().token;
            console.log('Token: ', this.token);
            this.sendNotification();
          } else {
            console.log('Kullanıcı belirtilen tokena sahip değil.');
          }
        })
        .catch(error => {
          console.error('Hata oluştu: ', error);
        });
    },
    sendNotification() {
      const messaging = firebase.messaging();
      messaging.getToken({ vapidKey: 'your-vapid-key' }).then(token => {
        console.log('Token: ', token);
        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          token: this.token
        };
        messaging.send(message).then(() => {
          console.log('Bildirim gönderildi.');
        }).catch(error => {
          console.error('Bildirim gönderilemedi: ', error);
        });
      }).catch(error => {
        console.error('Token alınamadı: ', error);
      });
    }
  }
}
</script>
