<template>
      <div class="container">
        
        <menulist/>
         <div class="content">
            <h1>Canlı konum görüntüle</h1>
            <div id="map"></div>
         </div>
        <oturumacik/>
        <footerkismi/>
        
      </div>
</template>
	
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import footerkismi from "~/components/footer-kismi.vue";
import menulist from "~/components/menu-list.vue";
import oturumacik from "~/components/oturum-acik.vue";

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  data() {
    return {
      latitude: 0,
      longitude: 0,
      user: '',
    };
  },
  
    
    
    
  created() {
    const uid = this.user.uid;
    firestore.collection('logs').doc(uid).onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data && data.canli_konum) {
          this.latitude = data.canli_konum.latitude;
          this.longitude = data.canli_konum.longitude;
        }
      }
    });
  },
  methods: {
    oturum(){
      firebase.auth().onAuthStateChanged(user=>{
        console.log(user)
        this.user = user;
      })
    },
    },
};
</script>


<style>
#map {
  height: 400px;
  width: 100%;
}
</style>