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
      uygulamaIstatistikleri: [], // Firestore'dan çekilen uygulama istatistiklerinin tutulacağı dizi
    }
  },

  created() {
  // Oturum açılmış kullanıcının UID'sini alıyoruz
  const kullaniciUid = firebase.auth().currentUser.uid;

  // Firestore'dan kullanıcının uygulama istatistiklerini çekiyoruz
  firebase.firestore().collection('logs').doc(kullaniciUid).collection('uygulamaIstatistik')
    .get()
    .then(querySnapshot => {
      // Çekilen kayıtları diziye ekliyoruz
      querySnapshot.forEach(doc => {
        // Firestore'dan gelen tarih verisini UTC formatına dönüştürüyoruz
        const sonKullanim = new Date(doc.data().sonKullanim.toDate().toUTCString());

        // Yeni bir obje oluşturup, dönüştürülmüş tarih ve uygulama adını ekliyoruz
        const istatistik = {
          uygulamaAdi: doc.data().uygulamaAdi,
          sonKullanim: sonKullanim
        };

        // İstatistikleri diziye ekliyoruz
        this.uygulamaIstatistikleri.push(istatistik);
      })
    })
    .catch(error => {
      console.error(error);
    })
}
</script>
