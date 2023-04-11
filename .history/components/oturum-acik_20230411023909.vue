<template>
  <div class="menuu">
    <div v-if="user" class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
        <p>Üyelik tarihi: {{formatDate(user.metadata.creationTime)}}</p>
        <p>Son giriş: {{formatDate(lastSignInDate)}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
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
<style>
.menuu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-details {
  margin-left: 10px;
}

.logout-btn {
  margin-left: auto;
}
</style>