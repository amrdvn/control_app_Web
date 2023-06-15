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
  
    
    
    
  },
};
</script>


<style>
#map {
  height: 400px;
  width: 100%;
}
</style>