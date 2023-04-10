<template>
      <div class="container">
        
        <menulist/>
        <oturumacik/>
        <footerkismi/>
        
      </div>
</template>
	
<script>
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'

export default {
  components: {
	menulist,
	icerikkismi,
  oturumacik,
	footerkismi,
  },
}
</script>

	<style>

		
</style>
