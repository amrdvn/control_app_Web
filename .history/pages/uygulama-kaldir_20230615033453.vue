<template>
  <div class="container">
    <menulist/>
    <div class="content">
      <h1>Uygulama Kaldır</h1>
   
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Uygulama Adı</th>
              <th>Kaldır</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="uygulama in uygulamalar" :key="uygulama.id">
              <td>{{ uygulama.uygulama_adi }}</td>
              <td>
                <div class="checkbox-group">
                  <input type="checkbox" :id="uygulama.id" :value="uygulama.id" v-model="seciliUygulamalar">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button class="kaldır-button" @click="uygulamalariKaldir">Kaldır</button>
    </div>
    <oturumacik/>
    <footerkismi/>
  </div>
</template>

<script>
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  data() {
    return {
      uygulamalar: [], // Firestore'dan alınacak uygulama listesi
      seciliUygulamalar: [], // Kaldırılacak uygulamaların ID'lerini içeren dizi
    }
  },
  mounted() {
    this.oturum()
  },
  methods: {
    oturum() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.uygulamalariGetir(user.uid)
        }
      })
    },
    async uygulamalariGetir(uid) {
      const snapshot = await firebase
        .firestore()
        .collection('logs')
        .doc(uid)
        .collection('uygulama_kisit')
        .get()

      this.uygulamalar = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          uygulama_adi: data.uygulama_adi,
        }
      })
    },
    uygulamalariKaldir() {
      const batch = firebase.firestore().batch()

      this.seciliUygulamalar.forEach(uygulamaId => {
        const docRef = firebase
          .firestore()
          .collection('logs')
          .doc(firebase.auth().currentUser.uid)
          .collection('uygulama_kisit')
          .doc(uygulamaId)

        batch.update(docRef, { kisit: 1 })
      })

      batch.commit().then(() => {
        console.log('Uygulamalar kaldırıldı')
      }).catch(error => {
        console.error('Uygulamaları kaldırırken bir hata oluştu:', error)
      })
    },
  },
}
</script>

<style>
.table-container {
  height: 300px;
  overflow-y: auto;
}

.kaldır-button {
  background-color: #2196f3;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.kaldır-button:hover {
  background-color: #1976d2;
}
</style>
