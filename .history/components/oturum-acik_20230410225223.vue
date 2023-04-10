<template>
  <div class="menu">
    <div v-if="user" class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{user.Ad+' '+user.Soyad}}</p>
        <p>{{user.email}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
    <div v-if="lastSignInDate">
      <p>Son oturum açılış tarihi: {{lastSignInDate}}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  data(){
    return {
      user: null,
      lastSignInDate: null
    }
  },
  mounted() {
    this.oturum();
  },
  methods: {
    oturum() {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          this.user = user;
          this.lastSignInDate = user.metadata.lastSignInTime;
        } else {
          this.user = null;
        }
      });
    },
    signout() {
      firebase.auth().signOut().then(result => {
        console.log(result);
        this.user = null;
        this.$router.push('/error');
      });
    }
  }
}
</script>
