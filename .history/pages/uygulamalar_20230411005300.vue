<template>
      <div class="container">
        
        <menulist/>
        <div class="container">
    <menulist />
    <div class="content">
  <h1>Uygulama Geçmişi Gör</h1>
   
  <table>
    <thead>
      <tr>
        <th>Uygulama adı</th>
        <th>Süre</th>
        <th>Tarih</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>+1 555-1234</td>
        <td>45 saniye</td>
        <td>1 Nisan 2023, 14:30</td>
      </tr>
      <tr>
        <td>+1 555-5678</td>
        <td>1 dakika 20 saniye</td>
        <td>2 Nisan 2023, 11:45</td>
      </tr>
      <tr>
        <td>+1 555-9012</td>
        <td>2 dakika 15 saniye</td>
        <td>3 Nisan 2023, 18:15</td>
      </tr>
      <tr>
        <td>+1 555-3456</td>
        <td>1 dakika 10 saniye</td>
        <td>4 Nisan 2023, 09:00</td>
      </tr>
      <tr>
        <td>+1 555-7890</td>
        <td>30 saniye</td>
        <td>5 Nisan 2023, 16:30</td>
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
