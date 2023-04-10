<template>
      <div class="container">
        
        <menulist/>
        <div class="content">
  <h1>Uygulama Kısıtı Ekle</h1>
   
  <table>
    <thead>
      <tr>
        <th>Uygulama Adı</th>
        <th>Durum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
      </tr>
    </tbody>
  </table>
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
