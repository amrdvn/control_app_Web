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

import 

export default {
  data(){
    return{
      user: '',
      token: '',
      title: '',
      body: ''
    }
  },
  mounted(){
    this.oturum()
  },
  methods:{
    oturum(){
      firebase.auth().onAuthStateChanged(user=>{
        this.user=user;
        this.getToken(user.uid)
      }) 
    },
    getToken(uid){
      firebase.firestore().collection('users').doc(uid).get().then(doc=>{
        if(doc.exists){
          this.token=doc.data().token
        }
      })
    },
    submit(){
      axios.post('https://fcm.googleapis.com/fcm/send',
        {
          "to": this.token,
          "notification":{
            "body": this.body,
            "title": this.title
          }
        },
        {
          headers: {
            'Authorization': 'key=AAAAMGjPLwc:APA91bEDUIb73L_y_kT8DLkj-GIxsEh7dG6ckZliLKYrmVKMaQezLZHEIoUUURFZgUWrqNvlY9edrUutcTv3zzgiqz-xo1M3XC2kYcoBFkwSlrV9uyKb5etGnLZP3h3Lg5tYosCFinpD',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response=>{
        console.log('Bildirim Gönderildi')
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>
