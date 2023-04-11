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
    <div v-if="lastSignInDate">
      <table>
        <tr>
          <td>Son giriş:</td>
          <td>{{ formatDate(lastSignInDate) }}</td>
        </tr>
      </table>
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
table {
  border-collapse: collapse;
  margin-top: 10px;
}

td {
  padding: 5px;
  border: 1px solid #ccc;
}

.logout-btn {
  margin-left: 10px;
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ff6090;
}
</style>
