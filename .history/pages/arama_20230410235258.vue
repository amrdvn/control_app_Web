<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Aramaları Gör</h1>
      <ul>
        <li>
          <span class="number">+1 555-1234</span>
          <span class="duration">45 saniye</span>
          <span class="date">1 Nisan 2023, 14:30</span>
        </li>
        <li>
          <span class="number">+1 555-5678</span>
          <span class="duration">1 dakika 20 saniye</span>
          <span class="date">2 Nisan 2023, 11:45</span>
        </li>
        <li>
          <span class="number">+1 555-9012</span>
          <span class="duration">2 dakika 15 saniye</span>
          <span class="date">3 Nisan 2023, 18:15</span>
        </li>
        <li>
          <span class="number">+1 555-3456</span>
          <span class="duration">1 dakika 10 saniye</span>
          <span class="date">4 Nisan 2023, 09:00</span>
        </li>
        <li>
          <span class="number">+1 555-7890</span>
          <span class="duration">30 saniye</span>
          <span class="date">5 Nisan 2023, 16:30</span>
        </li>
      </ul>
    </div>

    <oturumacik />
    <footerkismi />
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
