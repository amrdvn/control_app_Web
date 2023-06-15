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
    };
  },
  mounted() {
    this.oturum()
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`;
    script.defer = true;
    script.async = true;
    script.onload = this.mapYukle;
    document.head.appendChild(script);
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