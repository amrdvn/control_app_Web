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

import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi
  },
  data(){
        return{
           user: '',
           token: ''
        }
    },
    mounted(){
      this.oturum()
     
    }, 
    methods:{
        oturum(){
          firebase.auth().onAuthStateChanged(user=>{
        // eslint-disable-next-line no-console
        console.log('user :'+user.uid)
        this.user=user;
        this.getToken(user.uid)
        }) 
      },
      async getToken(uid){
        const response = await firebase.firestore().collection('users').doc(uid).get();
        if (response.exists) {
          const data = response.data();
          this.token = data.token;
        }
      },
      async submit(){
        const notification = {
          title: this.title,
          body: this.body
        };
        const message = {
          notification: notification,
          token: this.token
        };
        const config = {
          headers: {
            'Authorization: 'Bearer AAAAMGjPLwc:APA91bHSArapukUu4ZTeZrMTrrhrNcCuZ7aMaW0k_8o4bUmDNSdl5E2lLM_RYl0ReQ-QtNFuRWUsfT3GXbmmGtP6AMyK2xXzZEFbOiFQa0ZLyBB7F1q0WAgaQs7uCKM_N0Lq_EsJ-2IH',
            'Content-Type': 'application/json'
          }
        };
        try {
          const response = await axios.post('https://fcm.googleapis.com/v1/projects/control-app-a014e/messages:send', message, config);
          // eslint-disable-next-line no-console
          console.log(response.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
        
    }
  
}
</script>
