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
            <th>Toplam Süre (Son 1 Ay)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uygulama, index) in uygulamalar" :key="index">
            <td>{{ uygulama.packageName }}</td>
            <td>{{ formatTarih(uygulama.firstTimeStamp) }}</td>
            <td>{{ formatTarih(uygulama.lastTimeStamp) }}</td>
            <td>{{ uygulama.totalTimeInForeground }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'

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
      uygulamalar: []
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        this.uygulamalariGetir(uid);
      }
    });
  },

  methods: {
    async uygulamalariGetir(uid) {
      try {
        const logsCollectionRef = firebase.firestore().collection(`logs/${uid}/uygulama_kullanim`);
        const querySnapshot = await logsCollectionRef.get();
        const uygulamalar = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const usageData = data.usageData;
          
          usageData.forEach(uygulamaData => {
            const uygulama = {
              packageName: uygulamaData.packageName,
              firstTimeStamp: uygulamaData.firstTimeStamp,
              lastTimeStamp: uygulamaData.lastTimeStamp,
              totalTimeInForeground: uygulamaData.totalTimeInForeground
            };
            uygulamalar.push(uygulama);
          });
        });

        this.uygulamalar = uygulamalar;
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    },

    formatTarih(tarih) {
      const date = new Date(tarih);
      const yil = date.getFullYear();
      const ay = ('0' + (date.getMonth() + 1)).slice(-2);
      const gun = ('0' + date.getDate()).slice(-2);
      const saat = ('0' + date.getHours()).slice(-2);
      const dakika = ('0' + date.getMinutes()).slice(-2);
      const saniye = ('0' + date.getSeconds()).slice(-2);

      return `${gun}.${ay}.${yil}  ${saat}:${dakika}:${saniye}`;
    },
  },
};
</script>
