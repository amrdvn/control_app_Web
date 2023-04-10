<template>
      <div class="container">
        
        <menulist/>
        <icerikkismi pageTitle="Bildirim Gönder">
          <form>
        <label for="title">Başlık:</label><br>
        <input type="text" id="title" name="title"><br><br>
        <label for="message">İçerik:</label><br>
        <textarea id="message" name="message"></textarea><br><br>
        <button type="submit" onclick="sendNotification()">Bildirim Gönder</button>
    </form>
    </icerikkismi>
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
