<template>
  <nuxt/>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_LOGGED_IN', true)
        this.$router.push('/')
      } else {
        this.$store.commit('SET_LOGGED_IN', false)
        this.$router.push('/error')
      }
    })
  }
}
</script>
