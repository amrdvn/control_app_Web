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

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
      body: "",
    };
  },
  methods: {
    submit() {
      // Initialize Firebase app
      const firebaseConfig = {
        apiKey: "<your-api-key>",
        authDomain: "<your-auth-domain>",
        projectId: "<your-project-id>",
        storageBucket: "<your-storage-bucket>",
        messagingSenderId: "<your-messaging-sender-id>",
        appId: "<your-app-id>",
      };
      const app = initializeApp(firebaseConfig);

      // Get messaging instance
      const messaging = getMessaging(app);

      // Request permission and get registration token
      getToken(messaging, { vapidKey: "<your-vapid-key>" })
        .then((token) => {
          console.log("Token:", token);

          // Send message
          const message = {
            notification: {
              title: this.title,
              body: this.body,
            },
            token: token,
          };

          return messaging.send(message);
        })
        .then(() => {
          console.log("Notification sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    },
  },
};
</script>
