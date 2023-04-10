<template>
      <div class="container">
        
        <menulist/>
        <icerikkismi pageTitle="Bildirim Gönder"/>
        <div class="content">
          <label for="baslik">Başlık:</label><br>
  <input type="text" id="baslik" name="baslik"><br>
  <label for="icerik">İçerik:</label><br>
  <textarea id="icerik" name="icerik"></textarea><br><br>
  <button type="submit" value="Bildirim Gönder">Bildirim Gönder</button>
        </div>
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
