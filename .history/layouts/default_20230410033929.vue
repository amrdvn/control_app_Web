<template>
  <nuxt/>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import login from '~/components/login.vue'

export default {
  data(){
        return{
           user: ''
        }
    },
  
  mounted() {
     this.oturum(),
    if (this.isLoggedIn) {
      this.$router.push('/')
    } else {
      this.$router.push('/error')
    }
  }
}
</script>
