<template>
  <div>
    <h1>Bildirim Gönder</h1>
    <form @submit.prevent="sendNotification">
      <label for="title">Başlık:</label>
      <input type="text" id="title" name="title" v-model="title">
      <br>
      <label for="body">İçerik:</label>
      <textarea id="body" name="body" v-model="body"></textarea>
      <br>
      <button type="submit">Bildirim Gönder</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      body: ""
    };
  },
  methods: {
    sendNotification() {
      // Firebase Admin SDK'i yükleyelim
      const admin = require("firebase-admin");

      // Firebase Admin SDK için gerekli kimlik bilgilerini yükleyelim
      const serviceAccount = require("~/plugins");

      // Firebase Admin SDK'yi başlatıp Messaging nesnesini oluşturalım
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      const messaging = admin.messaging();

      // Bildirim mesajını oluşturalım
      const message = {
        notification: {
          title: this.title,
          body: this.body
        },
        topic: "all"
      };

      // Bildirimi gönderelim
      messaging
        .send(message)
        .then(() => {
          console.log("Bildirim gönderildi.");
          // Başarılı bir şekilde gönderildiğinde kullanıcıya bir bildirim gösterilebilir
        })
        .catch((error) => {
          console.error("Bildirim gönderilemedi: ", error);
          // Gönderim sırasında bir hata oluştuğunda kullanıcıya bir hata mesajı gösterilebilir
        });
    }
  }
};
</script>
