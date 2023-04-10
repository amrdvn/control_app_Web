<template>
      <div class="container">
        
        <menulist/>
        <icerikkismi pageTitle="Uygulama Listesi"/>
        <oturumacik/>
        <footerkismi/>
        
      </div>
</template>
	
<script>
import footerkismi from '~/components/footer-kismi.vue'
import icerikkismi from '~/components/icerik-kismi.vue'
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
