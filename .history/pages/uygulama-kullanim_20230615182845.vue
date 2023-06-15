<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Uygulama Kullanım Süresini Gör</h1>

      <div class="table">
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
              <td>{{ dakikayaCevir(uygulama.totalTimeInForeground) }}</td>
              <td>{{ saateCevir(uygulama.totalTimeInForeground) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/auth'
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
  data() {
    return {
      uygulamalar: [],
    };
  },
  created() {
    this.oturum();
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
    },
    oturum() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.uygulamalariGetir(user.uid);
        }
      });
    },
    uygulamalariGetir(uid) {
      const logsCollection = firebase.firestore().collection('logs').doc(uid).collection('uygulama_kullanim');
      logsCollection.get().then(querySnapshot => {
        const uygulamalar = [];
        querySnapshot.forEach(doc => {
          const usageData = doc.data().usageData;
          usageData.forEach(data => {
            const uygulama = {
              packageName: data.packageName,
              firstTimeStamp: data.firstTimeStamp,
              lastTimeStamp: data.lastTimeStamp,
              totalTimeInForeground: data.totalTimeInForeground,
            };
            uygulamalar.push(uygulama);
          });
        });
        this.uygulamalar = uygulamalar;
      });
    },
    dakikayaCevir(dakika) {
      return Math.floor(dakika) + ' dakika';
    },
    saateCevir(dakika) {
      const saat = Math.floor(dakika / 60);
      const dakikaKalan = Math.floor(dakika % 60);
      return saat + ' saat ' + dakikaKalan + ' dakika';
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.table {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 15px;
}
</style>
