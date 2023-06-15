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
            <th>Toplam Süre(1A)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(istatistik, index) in uygulamaIstatistikleri" :key="index">
            <td>{{ istatistik.uygulamaAdi }}</td>
            <td>{{ formatTarih(istatistik.sonKullanim)}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

import footerkismi from '~/components/footer-kismi.vue';
import menulist from '~/components/menu-list.vue';
import oturumacik from '~/components/oturum-acik.vue';

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },

  data() {
    return {
      uygulamaIstatistikleri: [], 
    }
  },

  created() {
    const kullaniciUid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('logs').doc(kullaniciUid).collection('uygulama_istatistik')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.uygulamaIstatistikleri.push(doc.data());
        })
      })
      .catch(error => {
        console.error(error);
      })
  },

 methods: {
  formatTarih(tarih) {
    const date = new Date(tarih);
    const yil = date.getFullYear();
    const ay = ('0' + (date.getMonth() + 1)).slice(-2);
    const gun = ('0' + date.getDate()).slice(-2);
    const saat = ('0' + date.getHours()).slice(-2);
    const dakika = ('0' + date.getMinutes()).slice(-2);
    const saniye = ('0' + date.getSeconds()).slice(-2);

    return `${gun}.${ay}.${yil}  ${saat}:${dakika}:${saniye}`;
  }
}
}
</script>
