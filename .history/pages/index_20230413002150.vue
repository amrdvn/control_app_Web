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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { onMounted, ref } from "vue";
import { getAuth } from 'firebase/auth'


import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  setup() {
    const title = ref("");
    const body = ref("");

    const submit = async () => {
      // get the current user's uid
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      
      // get the token from Firestore
      const db = getFirestore();
      const tokenRef = doc(db, "users", uid);
      const tokenDoc = await getDoc(tokenRef);
      const token = tokenDoc.data().token;
      
      // send the push notification using FCM
      const messaging = getMessaging();
      await messaging.send({
        data: {
          title: title.value,
          body: body.value,
        },
        token: token,
      });

      // clear the form fields
      title.value = "";
      body.value = "";
    };

    onMounted(async () => {
      // get the FCM token for the current user
      const messaging = getMessaging();
      const token = await getToken(messaging);
      
      // save the token to Firestore
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const db = getFirestore();
      const tokenRef = doc(db, "users", uid);
      await tokenRef.set({
        token: token,
      });
    });

    return {
      title,
      body,
      submit,
    };
  },
};
</script>
