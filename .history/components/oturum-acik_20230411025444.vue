<template>
  <div class="menuu">
    <div v-if="user" class="user-info">
      <div class="user-details">
        <img src="~/assets/icon/user.jpg" alt="User Icon">
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
      </div>
    </div>
    <button class="logout-btn" @click="signout">Çıkış Yap</button>
    <table v-if="lastSignInDate || membershipDate" class="user-info-table">
      <tr>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td>Son Giriş:</td>
        <td>{{ formatDate(lastSignInDate) }}</td>
      </tr>
      <tr>
        <td class="membership-header">Üyelik Tarihi:</td>
        <td>{{ formatDate(membershipDate) }}</td>
      </tr>
    </table>
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
      creationDate: null
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
          this.creationDate = user.metadata.creationTime;
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
  flex-direction: column;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-details {
  margin-left: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #e74c3c;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.user-dates {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
}

.user-dates p {
  margin-bottom: 0.5rem;
}
</style>
