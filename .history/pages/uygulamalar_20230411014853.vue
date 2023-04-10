<template>
  <div class="container">
    <menulist />
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
          <tr v-for="(istatistik, index) in uygulamaIstatistikleri" :key="index">
            <td>{{ istatistik.uygulamaAdi }}</td>
            <td>{{ istatistik.sonKullanim}}</td>
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

    firebase.firestore().collection('logs').doc(kullaniciUid).collection('uygulama_statistik')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const istatistik = doc.data();
          const tarih = new Date(istatistik.sonKullanim.seconds * 1000).toISOString();
          istatistik.sonKullanim = tarih.substring(0, tarih.length - 5).replace('T', ' ');
          this.uygulamaIstatistikleri.push(istatistik);
        })
      })
      .catch(error => {
        console.error(error);
      })
  }
}
</script>