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
html {
  background-color: #f6f8fa;
}
		body {
			margin: 0;
			padding: 0;
			background-color: #f6f8fa;
			font-family: Arial, sans-serif;
			  overflow-x: hidden;

		}

		.container {
			display: flex;
			height: 100vh;
			flex-direction: row;
			overflow: hidden;
			  flex-grow: 1;
		}

		

		
		.footer {
  background-color: #e9ecef  ;
  color: #4a4a4a;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
