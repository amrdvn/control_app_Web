<template>

      <nuxt/>
   
</template>
	
<script>
export default {
  beforeMount() {
    if (!this.$fireAuth.currentUser) {
      this.$router.push('/error')
    }
  },
 
}
</script>

