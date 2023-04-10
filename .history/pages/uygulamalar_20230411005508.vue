<template>
      <div class="container">
        
        <menulist/>
    <div class="content">
  <h1>Uygulama Geçmişi Gör</h1>
   
  <table>
    <thead>
      <tr>
        <th>Uygulama Adı</th>
        <th>Son Kullanım</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
        <td>2023-04-06T21:18:48.424</td>
      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
        <td>2023-04-06T21:18:48.424</td>
      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
        <td>2023-04-06T21:18:48.424</td>
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
