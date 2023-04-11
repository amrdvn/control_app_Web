<template>
  <div class="menu">
    <div v-if="user" class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
    <hr>
    <div class="user-info">
      <p>Son giriş:</p>
      <p>{{ formatDate(lastSignInDate) }}</p>
    </div>
    <div class="user-info">
      <p>Üyelik tarihi:</p>
      <p>{{ formatDate(memberSinceDate) }}</p>
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
      lastSignInDate: null,
      memberSinceDate: null
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
          this.memberSinceDate = user.metadata.creationTime;
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

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info p:first-child {
  margin-right: 10px;
}

hr {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0;
  border-top: 1px solid #eee;
}
</style>
