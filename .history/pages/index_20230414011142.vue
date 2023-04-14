<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <div class="emoji-picker-container">
        <vue-emoji-picker @emoji="addEmoji" />
      </div>
      <form @submit.prevent="submit">
        <label for="baslik">Başlık:</label><br>
        <input type="text" id="baslik" name="baslik" v-model="title" ref="titleInput"><br><br>
        <label for="icerik">İçerik:</label><br>
        <textarea id="icerik" name="icerik" v-model="body" ref="bodyInput"></textarea><br><br>
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
import VueEmojiPicker from 'vue-emoji-picker'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
    VueEmojiPicker
  },
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
        console.log('user :'+user.uid)
        this.user=user;
        this.getToken(user.uid)
      }) 
    },
    getToken(uid){
      firebase.firestore().collection("users").doc(uid).get().then((doc) => {
        if (doc.exists) {
          this.token = doc.data().token
        } else {
          console.log("Token not found for this user")
        }
      }).catch((error) => {
        console.log("Error getting token:", error)
      })
    },
    submit(){
      let notification = {
        'title': this.title,
        'body': this.body
      }
      axios.post('https://fcm.googleapis.com/fcm/send', 
        {
          "notification": notification,
          "to": this.token
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=your_server_key_here'
          }
        }
      ).then(response => {
        console.log(response)
        this.title = ''
        this.body = ''
        this.$refs.titleInput.focus()
      }).catch(error => {
        console.log(error)
      })
    },
    addEmoji(emoji) {
      const titleInput = this.$refs.titleInput;
      const bodyInput = this.$refs.bodyInput;
      titleInput.value += emoji;
      bodyInput.value += emoji;
      titleInput.focus();
    }
  }
}
</script>

<style scoped>
.emoji-picker-container {
  position: relative;
}
.vue-emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 0;
}
</style>
