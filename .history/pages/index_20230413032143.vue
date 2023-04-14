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
      try {
        const currentToken = await messaging.getToken({ vapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' })
        if (currentToken) {
          console.log('Got FCM token:', currentToken);
          const payload = {
            notification: {
              title: this.title,
              body: this.body,
              click_action: 'https://example.com',
            },
          }
          await messaging.sendToDevice(currentToken, payload)
          console.log('Bildirim gönderildi.')
        } else {
          console.log('No FCM token available.');
        }
      } catch (error) {
        console.error('Bildirim gönderilirken hata oluştu:', error)
      }
    },
  },
}
</script>
