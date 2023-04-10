<template>
  <nuxt/>
</template>

<script>
export default {
  async beforeMount() {
    const isLoggedIn = await this.$store.dispatch('checkAuth')
    if (isLoggedIn) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
  }
}

</script>
