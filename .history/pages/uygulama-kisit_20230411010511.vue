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
        <th>Aktif/Pasif Durumu</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
        <td>Aktif</td>
        <td>
              <div class="radio-group">
                <input type="radio" id="aktif-1" name="durum-1" value="aktif" checked="true">
                <label for="aktif-1">Aktif</label>
                <input type="radio" id="pasif-1" name="durum-1" value="pasif">
                <label for="pasif-1">Pasif</label>
              </div>
            </td>
      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
                <td>Aktif</td>
                <td>
              <div class="radio-group">
                <input type="radio" id="aktif-2" name="durum-2" value="aktif" checked="true">
                <label for="aktif-2">Aktif</label>
                <input type="radio" id="pasif-2" name="durum-2" value="pasif">
                <label for="pasif-2">Pasif</label>
              </div>
            </td>

      </tr>
      <tr>
        <td>com.google.android.apps.nexuslauncher</td>
                <td>Aktif</td>
                <td>
              <div class="radio-group">
                <input type="radio" id="aktif-3" name="durum-3" value="aktif"checked="true">
                <label for="aktif-3">Aktif</label>
                <input type="radio" id="pasif-3" name="durum-3" value="pasif">
                <label for="pasif-3">Pasif</label>
              </div>
            </td>

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
