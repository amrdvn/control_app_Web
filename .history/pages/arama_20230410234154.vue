<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Aramaları Gör</h1>
      <ul>
        <li v-for="(log, index) in logs" :key="index">
        {{ log.number }} - {{ log.duration }} - {{ log.date }}
      </li>
      </ul>
    </div>

    <oturumacik />
    <footerkismi />
  </div>
</template>
	
<script>
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'

export default {

  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  async asyncData({ $fireStore }) {
    const logs = []
    const querySnapshot = await $fireStore.collection('logs').doc('uid').collection('aramaKaydi').get()

    querySnapshot.forEach(doc => {
      const data = doc.data()
      logs.push({
        number: data.number,
        duration: data.duration,
        date: data.date.toDate().toLocaleString()
      })
    })

   data return { logs }
  }
}
</script>


