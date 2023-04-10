<template>
<div class="menu">

    <div class="user-info">
    <img src="~/assets/icon/user.jpg" alt="User Icon">
    <div class="user-details">
      <p>Aykut Merdivan</p>
      <p>aykutmerdivan@example.com</p>
    </div>
  </div>
  <button class="logout-btn">Çıkış Yap</button>
</div>
</template>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  data(){
        return{
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
        
      },
        
    }
}

</script>
