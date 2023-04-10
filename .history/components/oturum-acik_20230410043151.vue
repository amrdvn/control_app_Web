<template>
<div class="menu">

    <div class="user-info">
    <img src="~/assets/icon/user.jpg" alt="User Icon">
    <div class="user-details">
      <p>{{user.Ad+' '+user.Soyad}}</p>
      <p>{{user.email}}</p>
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
        return{
          ad,
           user: ''
        }
    },
    mounted(){
      this.oturum()
     
    }, 
    methods:{
        oturum(){
          firebase.auth().onAuthStateChanged(user=>{
        // eslint-disable-next-line no-console
        console.log(user)
        this.user=user;
        
        
      }) 
      },
      signout(){
            firebase.auth().signOut().then(result=>{
                // eslint-disable-next-line no-console
                console.log(result)
                this.user=''
                this.$router.push('/error')
            })
        }
        
    }
}

</script>
