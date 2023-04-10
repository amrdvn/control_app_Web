<template>
  <div class="container">
    <menulist />
    <div class="content">
      <div id="map"></div>
    </div>
    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import footerkismi from "~/components/footer-kismi.vue";
import menulist from "~/components/menu-list.vue";
import oturumacik from "~/components/oturum-acik.vue";
import firebase from "firebase";

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  mounted() {
    const firebaseConfig = {
      // Firebase yapılandırma bilgileri buraya gelecek
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const konumlarCollection = db.collection("logs").doc(uid).collection("konumlar");

    // Firestore'dan konum verilerini getir
    konumlarCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const konumData = doc.data();

        // Konum bilgilerini haritada göster
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: { lat: konumData.latitude, lng: konumData.longitude },
        });

        const marker = new window.google.maps.Marker({
          position: { lat: konumData.latitude, lng: konumData.longitude },
          map: map,
        });
      });
    });
  },
};
</script>

<style>
#map {
  height: 500px;
  width: 100%;
}
</style>
