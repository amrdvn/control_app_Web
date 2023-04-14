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
import firebase 

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
      title: "",
      body: ""
    }
  },
  methods: {
    submit() {
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(uid).get()
      .then(doc => {
        const registrationToken = doc.data().token;

        const message = {
          notification: {
            title: this.title,
            body: this.body
          },
          token: registrationToken
        };

        admin.messaging().send(message)
        .then(response => {
          console.log("Message sent successfully:", response);
        })
        .catch(error => {
          console.log("Error sending message:", error);
        });
      })
      .catch(error => {
        console.log("Error getting user document:", error);
      });
    }
  }
}
</script>
