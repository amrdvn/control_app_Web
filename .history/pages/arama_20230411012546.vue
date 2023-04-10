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
          <!-- Burada Firestore'dan çekilen arama kayıtlarını dinamik olarak listeleyeceğiz -->
          <tr v-for="(arama, index) in aramaKayitlari" :key="index">
            <td>{{ arama.numara }}</td>
            <td>{{ arama.saniye }}</td>
            <td>{{ arama.tarih.toDate() | formatDate}}</td>
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
      aramaKayitlari: [], // Firestore'dan çekilen arama kayıtlarının tutulacağı dizi
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
  // eslint-disable-next-line vue/order-in-components
  filters: {
    formatDate: function(value) {
      if (value) {
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} ${hour}:${minute}:${second}`
      }
    }
  },
}
</script>
