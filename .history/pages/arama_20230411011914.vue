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
            <td>{{ arama.sure }}</td>
            <td>{{ arama.tarih }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

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
    // Oturum açılmış kullanıcının UID'sini alıyoruz
    const kullaniciUid = firebase.auth().currentUser.uid

    // Firestore'dan kullanıcının arama kayıtlarını çekiyoruz
    firebase.firestore().collection('logs').doc(kullaniciUid).collection('aramaKaydi').get()
      .then(querySnapshot => {
        // Çekilen kayıtları diziye ekliyoruz
        querySnapshot.forEach(doc => {
          this.aramaKayitlari.push(doc.data())
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
