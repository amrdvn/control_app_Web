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
  beforeMount() {
    if (this.isLoggedIn) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>