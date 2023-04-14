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
      body: '',
      user: ''
    }
  },
  mounted(){
      this.oturum()
     
    }, 
  methods: {
    oturum()
    {
       oturum()
       // eslint-disable-next-line no-lone-blocks
       {
          firebase.auth().onAuthStateChanged(user=>{
        // eslint-disable-next-line no-console
        console.log(user)
        this.user=user;
       }) 
      }
    },
    async submit() {
  const user = firebase.auth().currentUser;
  if (!user) {
    // user is not authenticated, display an error message or redirect to login page
    console.log('User is not authenticated');
    return;
  }
  const uid = user.uid;
  const tokenRef = firebase.firestore().doc(`users/${uid}/token`);

  try {
    const tokenSnapshot = await tokenRef.get();
    const token = tokenSnapshot.data().value;

    const response = await axios.post(
      'https://fcm.googleapis.com/v1/projects/controlapp-18c8f/messages:send',
      {
        message: {
          token: token,
          notification: {
            title: this.title,
            body: this.body
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.vapidKey}`
        }
      }
    );
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
  }
}
</script>