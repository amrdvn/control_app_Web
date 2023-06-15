<template>
      <div class="container">
        
        <menulist/>
        <div class="content">
  <h1>Uygulama Kaldır</h1>
   
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
       
        <td>
              <div class="radio-group">
                <input type="radio" id="aktif-1" name="durum-1" value="aktif" checked="true">
                <label for="aktif-1">Aktif</label>
                
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
.radio-group label {
  margin-right: 10px;
}

		
</style>
