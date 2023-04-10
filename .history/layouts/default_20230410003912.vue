<template>

      <nuxt/>
   
</template>
	
<script>
import { auth } from '~/plugins/firebase.js'


export default {
  components: {
	
  },
  mounted() {
    if (!this.$fireAuth.currentUser) {
      // Kullanıcı giriş yapmamış, yönlendirme yap
      this.$router.push('/error')
    }
}
</script>

	<style>

</style>