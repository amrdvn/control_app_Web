<template>
      <div class="container">
        
        <menulist/>
         <div class="content">
            <h1>Konum geçmişi görüntüle</h1>
            <div id="map"></div>
         </div>
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
  oturumacik,
	footerkismi,
  },
}
</script>

	<style>

		
</style>
