<template>
  <div class="login-container">
    <form class="form" @submit.prevent="submit">
      <h1>Control App Web Paneli</h1>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="submit" value="Giriş Yap" @click.prevent="pressed()">
      <span v-if="errorMessage" id="error-msg" style="color:#ff5252;">{{ errorMessage }}</span>
      <span>Hesabın yok mu? <a href="#">Kayıt Ol</a></span>
    </form>
    <footerkismi/>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import footerkismi from '~/components/footer-kismi.vue'


export default {
  components: {
    footerkismi,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_LOGGED_IN', true)
        this.$router.push('/index')
      } else {
        this.$store.commit('SET_LOGGED_IN', false)
        this.$router.push('/error')
      }
    })
  },
  methods:{
        pressed(){
           firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(user=>{
               console.log(user);
               this.$router.push('/')
               
           }).catch(error=>{
               alert("Kullanıcı adı veya şifre hatalı...") 
               this.errors=error;
               this.$router.push('/error')
           })
        }
    },
    
    
}
</script>


<style>
.login-container {
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
        }

        .form {
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            padding: 40px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .form h1 {
            margin: 0 0 20px 0;
            font-size: 24px;
            font-weight: 600;
            color: #4a4a4a;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .form input[type="text"], 
        .form input[type="password"], 
        .form input[type="email"] {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #f2f2f2;
            margin-bottom: 20px;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .form input[type="submit"] {
            background-color: #1a8cff;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            width: 100%;
        }

        .form input[type="submit"]:hover {
            background-color: #0d6aad;
        }

        .form span {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
        }

        .form a {
            color: #1a8cff;
            text-decoration: none;
            font-size: 14px;
            margin-top: 10px;
        }

        

        .form span.warning {
            color: #ff0000;
            margin-top: 10px;
            font-size: 15px;
            text-align: center;
        }

        .error {
            position: absolute;
            font-size: 18px;
            color: #dc3545;
            background-color: #ffdddd;
            padding: 5px;
            border-radius: 5px;
        }

        .error.top {
            bottom: 100px;
        }

        .error.bottom {
            bottom: -40px;
        }
</style>
