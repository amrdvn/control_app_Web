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
<template>
  <div class="menu">
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

<style>
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 2rem;
}

.user-info img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
}

.user-info p {
  margin: 0;
}

.logout-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.logout-btn:hover {
  background-color: transparent;
  color: #333;
  text-decoration: underline;
}

.user-info-table {
  margin-top: 1rem;
  border-collapse: collapse;
}

.user-info-table tr td, .user-info-table tr th {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

.user-info-table tr th {
  text-align: left;
  font-weight: bold;
}

.membership-header {
  vertical-align: top;
}

@media (max-width: 600px) {
  .user-info {
    display: none;
  }

  .logout-btn {
    margin-left: 1rem;
  }
}
</style>