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
import { messaging } from '~/plugins/firebase.js'

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
    }
  },
  methods: {
    async submit() {
      await messaging.sendToDevice(token, payload)

  const token = "fjl-ZNNLQ1-crw5KiLrMF3:APA91bFOIJsdUNjqX52B8zAP1gxg3tSRmUC_KexJaIYfTqhKGq9EJwaTvvHsXtsh7vWVm-kS-yngHEQ0kxkcji_lC1UnV5jiOTF5LaiCJzz6QRAnZylh4HWFSJPEqiwchu_60py72L9_";

  const payload = {
    notification: {
      title: this.title,
      body: this.body,
      click_action: 'https://example.com',
    },
  };

  try {
    if (fcm.messaging && fcm.messaging.sendToDevice) {
      await fcm.messaging.sendToDevice(token, payload);
      console.log('Bildirim gönderildi.');
    } else {
      console.error('Messaging or sendToDevice method is not defined');
    }
  } catch (error) {
    console.error('Bildirim gönderilirken hata oluştu:', error);
  }
}
  },
}
</script>
