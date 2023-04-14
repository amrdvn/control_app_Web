<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="submit">
        <label for="baslik">Başlık:</label><br>
        <input type="text" id="baslik" name="baslik" v-model="title" ><br><br>
        <emoji-picker @emoji="append" :search="search">
      <button
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >
         <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-grey">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </button>
      <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
          <div class="emoji-picker__search">
            <input type="text" v-model="search" v-focus>
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
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
import EmojiPicker from "vue-emoji-picker";

import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'


export default {
  components:{
    footerkismi,menulist,oturumacik, EmojiPicker
  },
  data(){
    return{
      user: '',
      token: '',
      title: '',
      body: '',
      input:'',
      search:'',
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
        alert('Bildirim Gönderildi.')
      })
      .catch(error=>{
        alert('HATA :Bildirim gönderilemedi..')
      })
      this.title=''
      this.body=''
    },
    append(emoji) {
      this.input += emoji
    },
  }
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>
