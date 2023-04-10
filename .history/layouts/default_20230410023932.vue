<template>
  <nuxt/>
</template>

<script>
export default {
  beforeMount() {
    if (!this.$fireAuth.currentUser) {
      this.$router.push('/error')
    } else {
      this.$router.push('/')
    }
  }
}
</script>
