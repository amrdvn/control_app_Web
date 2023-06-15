<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Uygulama Kullanım Süresini Gör</h1>

      <table>
        <thead>
          <tr>
            <th>Uygulama Adı</th>
            <th>İlk Kullanım</th>
            <th>Son Kullanım</th>
            <th>Toplam Süre(Son 1 Ay)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>com.example.control_app</td>
            <td>2023-06-14T04:32:57.510</td>
            <td>2023-06-15T04:32:57.509</td>
            <td>230.79386666666667</td>
          </tr>
        </tbody>
      </table>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>


import footerkismi from '~/components/footer-kismi.vue';
import menulist from '~/components/menu-list.vue';
import oturumacik from '~/components/oturum-acik.vue';

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },

}
</script>
