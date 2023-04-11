<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="sendMessage">
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
    async function sendMessage() {
  const message = {
    to: '/topics/test',
    notification: {
      title: 'Bildirim Başlığı',
      body: 'Bildirim İçeriği'
    },
    data: {
      myKey: 'myValue'
    }
  };

  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', message, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.FCM_SERVER_KEY}`
      }
    });
    console.log('FCM API yanıtı:', response.data);
  } catch (error) {
    console.error('Bildirim gönderilemedi:', error);
  }
}
  
}
</script>



<style>
</style>
