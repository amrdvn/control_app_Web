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
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

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
        const user = this.$auth.user
        const tokenRef = this.$fireStore.doc(`users/${user.uid}/token`)
        const tokenDoc = await tokenRef.get()
        const token = tokenDoc.data().token
        const vapidKey = "BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8"

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'project_id': this.$fireConfig.projectId
          }
        }

        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          webpush: {
            fcm_options: {
              link: "https://example.com"
            },
            notification: {
              vapid_key: vapidKey
            }
          },
          token: token
        }

        await axios.post('https://fcm.googleapis.com/v1/projects/' + this.$fireConfig.projectId + '/messages:send', message, config)

        this.title = ''
        this.body = ''
        alert('Bildirim gönderildi.')
      } catch (error) {
        console.error(error)
        alert('Bildirim gönderirken bir hata oluştu.')
      }
    }
  }
}
</script>