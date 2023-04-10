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
}
</script>
