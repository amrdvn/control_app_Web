<template>
  <div class="menu">
    <div v-if="user" class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{user.Ad}}</p>
        <p>{{user.Ad}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
    <div><br></div>
    <div v-if="lastSignInDate" class="date-info">
      <p class="date-title">Son giriş:</p>
      <p class="date-value">{{formatDate(lastSignInDate)}}</p>
      <br>
    </div>
    <div v-if="membershipDate" class="date-info">
      <p class="date-title">Üyelik tarihi:</p>
      <p class="date-value">{{formatDate(membershipDate)}}</p>
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
      lastSignInDate: null,
      membershipDate: null
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
          this.membershipDate = user.metadata.creationTime;
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
    },
    formatDate(date) {
      const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      };
      return new Date(date).toLocaleString('tr-TR', options);
    }
  }
}
</script>
