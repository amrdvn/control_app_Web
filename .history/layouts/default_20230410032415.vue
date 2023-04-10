<template>
  <nuxt/>
</template>


<script>
export default {
  created() {
    const user = firebase.auth().currentUser
    if (user) {
      this.$store.dispatch('login')
    } else {
      this.$router.push('/error')
    }
  }
}
</script>