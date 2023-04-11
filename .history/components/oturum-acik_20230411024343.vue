<template>
  <div class="menu">
    <div v-if="user" class="user-info">
      <table>
        <tr>
          <td><img src="~/assets/icon/user.jpg" alt="User Icon"></td>
          <td>
            <p>{{user.name}}</p>
            <p>{{user.email}}</p>
            <p>Üyelik Tarihi: {{formatDate(user.metadata.creationTime)}}</p>
            <p>Son Giriş Tarihi: {{formatDate(user.metadata.lastSignInTime)}}</p>
          </td>
        </tr>
      </table>
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
      user: null
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
  margin: 10px;
  font-size: 16px;
}

td {
  padding: 10px;
  border: 1px solid #ddd;
}

td:first-child {
  width: 60px;
}

.user-info p {
  margin: 5px 0;
}
</style>
