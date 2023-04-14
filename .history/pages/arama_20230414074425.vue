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
          <tr v-for="(arama, index) in aramaKayitlari" :key="index">
            <td>{{ arama.numara }}</td>
            <td>{{ arama.saniye }}</td>
            <td>{{ formatDate(arama.tarih) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <oturumacik />
    <footerkismi />
    <div style="height: 50px;"></div>

  </div>
</template>

<script>
import firebase from 'firebase/compat/app';

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
      aramaKayitlari: [], 
    }
  },

  created() {
    const kullaniciUid = firebase.auth().currentUser.uid

    firebase.firestore().collection('logs').doc(kullaniciUid).collection('aramaKaydi').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.aramaKayitlari.push(doc.data())
        })
      })
      .catch(error => {
        console.error(error)
      })
  },

  methods: {
    formatDate(tarih) {
      const date = new Date(tarih.seconds * 1000) 
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
}
</script>
