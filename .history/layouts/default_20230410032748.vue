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
  
}
</script>