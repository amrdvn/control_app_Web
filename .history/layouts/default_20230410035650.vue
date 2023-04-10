<template>

      <nuxt/>
   
</template>
	
<script>
export default {
  beforeMount() {
    if (!this.$fireAuth.currentUser) {
      // Kullanıcı giriş yapmamış, yönlendirme yap
      this.$router.push('/error')
    }
  },
  // ...
}
</script>

