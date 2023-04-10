<template>
  <nuxt />
</template>

<script>
export default {
  created() {
    this.redirectIfNotLoggedIn()
  },

  methods: {
    redirectIfNotLoggedIn() {
      if (!this.$fireAuth.currentUser) {
        this.$router.push('/error')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
