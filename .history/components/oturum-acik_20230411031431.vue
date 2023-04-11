<template>
  <div class="menu">
    <div v-if="user" class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{adSoyad}}</p>
        <p>{{user.email}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
    <div><br></div>
    <div v-if="sonGiris" class="date-info">
      <p class="date-title">Son giriş:</p>
      <p class="date-value">{{formatDate(sonGiris)}}</p>
      <br>
    </div>
    <div v-if="uyelikTarihi" class="date-info">
      <p class="date-title">Üyelik tarihi:</p>
      <p class="date-value">{{formatDate(uyelikTarihi)}}</p>
      <br>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  data(){
    return {
      user: null,
      sonGiris: null,
      uyelikTarihi: null,
      adSoyad: ''
    }
  },
  mounted() {
    this.oturum();
  },
  methods: {
    oturum() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          this.sonGiris = user.metadata.lastSignInTime;
          this.uyelikTarihi = user.metadata.creationTime;
          this.getadSoyad();
        } else {
          this.user = null;
        }
      });
    },
    signout() {
      firebase.auth().signOut().then(result => {
        this.user = null;
        this.$router.push('/error');
      });
    },
    formatDate(date) {
      const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      };
      return new Date(date).toLocaleString('tr-TR', options);
    },
    async getadSoyad() {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(this.user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        this.adSoyad = data.Ad + ' ' + data.Soyad;
      }
    }
  }
}
</script>
