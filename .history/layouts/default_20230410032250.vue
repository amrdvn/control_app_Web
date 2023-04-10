<template>
  <nuxt/>
</template>
<script>
export default {
  mounted() {
    if (!this.$fireAuth.currentUser) {
      this.$router.push('/error')
    } else {
      this.$router.push('/')
    }
  }
}
</script>
