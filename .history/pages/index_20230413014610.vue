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
import { messaging } from '~/plugins/firebase.js'
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
        const user = firebase.auth().currentUser;
        const tokenRef = firebase.firestore().collection('users').doc(user.uid).collection('tokens').doc('token');
        const tokenSnap = await tokenRef.get();
        const token = tokenSnap.data().token;
        
        const payload = {
          notification: {
            title: this.title,
            body: this.body,
            icon: '/favicon.png'
          }
        };
        
        await messaging.getToken({ vapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' });
        await messaging.requestPermission();
        await messaging.sendToDevice(token, payload);
        
        alert('Bildirim gönderildi!');
        this.title = '';
        this.body = '';
      } catch (error) {
        console.error(error);
        alert('Bildirim gönderilemedi!');
      }
    }
  }
}
</script>
