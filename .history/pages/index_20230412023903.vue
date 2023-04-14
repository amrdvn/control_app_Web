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
      body: '',
    }
  },

  methods: {
    async submit() {
      const currentUser = this.$fireAuth.currentUser
      const uid = currentUser.uid

      // Firestore'dan kullanıcının token'ını al
      const docRef = this.$fireStore
        .collection('users')
        .doc(uid)
      const doc = await docRef.get()
      const token = doc.data().token

      // Notification payload
      const payload = {
        notification: {
          title: this.title,
          body: this.body,
        },
        token: token,
      }

      // Firebase Cloud Messaging ile bildirim gönder
      const response = await this.$fireMessaging.send(payload)
      console.log('Bildirim gönderildi: ', response)
    },
  },
}
</script>