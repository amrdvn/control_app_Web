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
.container {
			display: flex;
			height: 100vh;
			flex-direction: row;
			overflow: hidden;
			  flex-grow: 1;
		}
</style>