<template>
  <div class="menu">
    <div class="user-info">
      <img src="~/assets/icon/user.jpg" alt="User Icon">
      <div class="user-details">
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
      </div>
    </div>
    <div class="menu-options">
      <button class="logout-btn" @click="signout">Çıkış Yap</button>
      <div class="membership-info">
        <p>Üyelik Tarihi:</p>
        <p>{{formatDate(memberSinceDate)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  data() {
    return {
      user: null,
      memberSinceDate: null
    }
  },
  mounted() {
    this.checkAuthState();
  },
  methods: {
    checkAuthState() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.menu-options {
  display: flex;
  align-items: center;
}

.membership-info {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 20px;
}
</style>
