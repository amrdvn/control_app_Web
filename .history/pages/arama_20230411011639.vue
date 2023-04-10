<template>
  <div class="container">
    <menulist />
    <div class="content">
  <h1>Aramaları Gör</h1>
   
  <table>
    <thead>
      <tr>
        <th>Numara</th>
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
      
    </tbody>
  </table>
</div>


    <oturumacik />
    <footerkismi />
  </div>
</template>
	
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
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
