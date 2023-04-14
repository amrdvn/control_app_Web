<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="submit">
        <label for="baslik">Başlık:</label><br>
        <input type="text" id="baslik" name="baslik" v-model="title" ><br><br>
        <emoji-picker @emoji="insert" :search="search">
  <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
    <button type="button">open</button>
  </div>
  <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
    <div>
      <div>
        <input type="text" v-model="search">
      </div>
      <div>
        <div v-for="(emojiGroup, category) in emojis" :key="category">
          <h5>{{ category }}</h5>
          <div>
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
      input:''
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
    addEmoji(emoji) {
      const input = this.$refs.emojiInput;
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      const caretPos = startPos + emoji.length;

      this.emojiInputValue =
        this.emojiInputValue.substring(0, startPos) +
        emoji +
        this.emojiInputValue.substring(endPos);

      input.focus();
      input.selectionStart = caretPos;
      input.selectionEnd = caretPos;
    },
  }
}
</script>
