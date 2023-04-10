<template>
  <nuxt/>
</template>

<script>

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
