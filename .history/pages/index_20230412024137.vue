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
import axios from 'axios'

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
        const uid = this.$auth.user.uid // kullanıcının UID'sini alın
        const serverKey = this.$config.firebase.messagingSenderId // server key'i alın
        const notification = {
          title: this.title,
          body: this.body
        }
        const tokenResponse = await axios.get(`/users/${uid}/token`) // kullanıcının token bilgisini alın
        const token = tokenResponse.data
        const payload = {
          notification,
          token: token
        }
        const response = await axios.post(`https://fcm.googleapis.com/fcm/send`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${serverKey}`
          }
        })
        console.log(response.data) // başarılı bir şekilde bildirim gönderildiyse, response'da bir mesaj gösterin
      } catch (error) {
        console.log(error) // hata varsa konsola yazdırın
      }
    }
  }
}
</script>
