<template>
  <nuxt/>
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
        this.$router.push('/')
      }) 
      },
        
    }
}
</script>
