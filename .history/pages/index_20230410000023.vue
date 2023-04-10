<template>
      <div class="container">
        <menulist />
        <icerikkismi />
        <footerkismi/>
      </div>
</template>
	
<script>
import footerkismi from '~/components/footer-kismi.vue'
import icerikkismi from '~/components/icerik-kismi.vue'
import menulist from '~/components/menu-list.vue'

export default {
  components: {
	menulist,
	icerikkismi,
	footerkismi,
  },
}
</script>

	<style>

		

		
		
</style>
