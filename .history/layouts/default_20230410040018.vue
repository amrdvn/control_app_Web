<template>
  <nuxt/>
</template>

<script>
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
