<template>
  <div class="menu">
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
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: #fff;
  z-index: 999;
}

.menu p {
  margin: 0;
  line-height: 1.5;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}

.logout-btn {
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu {
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-info {
    margin-bottom: 10px;
  }

  .user-info img {
    margin-right: 0;
    margin-bottom: 5px;
  }
}
</style>