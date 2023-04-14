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
      body: '',
      token: '',
      user: null
    }
  },
  methods: {
    submit() {
  const messaging = firebase.messaging();

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed:', refreshedToken);
      // token işlemleri burada yapılır
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });

  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');
    return messaging.getToken();
  }).then((token) => {
    console.log('Token:', token);
    // token işlemleri burada yapılır
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });
},


    sendNotification() {
      const messaging = firebase.messaging();
      messaging.getToken({ vapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' }).then(token => {
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
