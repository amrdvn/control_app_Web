<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Canlı konum görüntüle</h1>
      <div id="map"></div>
    </div>
    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
      user: null,
      markers: [],
      map: null,
    };
  },
  mounted() {
    this.oturum();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY2}`;
    script.defer = true;
    script.async = true;
    script.onload = this.mapYukle;
    document.head.appendChild(script);
  },
  methods: {
    oturum() {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        this.user = user;
        this.markerGetir();
        this.subscribeToLocationChanges();
      });
    },
    async markerGetir() {
      const snapshot = await firebase
        .firestore()
        .collection('logs')
        .doc(this.user.uid)
        .collection('canli_konum')
        .get();

      snapshot.forEach(doc => {
        const data = doc.data();
        const marker = new google.maps.Marker({
          position: { lat: data.latitude, lng: data.longitude },
          map: this.map,
          title: `${new Date(data.tarih).toLocaleDateString()} ${new Date(data.tarih).toLocaleTimeString()}`,
        });

        this.markers.push(marker);
      });

      // Sayfa yüklendiğinde konuma yönel
      if (this.markers.length > 0) {
        const firstMarkerPosition = this.markers[0].getPosition();
        this.map.setCenter(firstMarkerPosition);
      }
    },
    mapYukle() {
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
  });

  if (this.markers.length > 0) {
    const firstMarker = this.markers[0];
    const position = firstMarker.getPosition();
    if (position && position.lat() && position.lng()) {
      this.map.setCenter(position);
    }
  }

  this.markerGetir();
},
    subscribeToLocationChanges() {
      firebase
        .firestore()
        .collection('logs')
        .doc(this.user.uid)
        .collection('canli_konum')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const data = change.doc.data();
              const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                map: this.map,
                title: `${new Date(data.tarih).toLocaleDateString()} ${new Date(data.tarih).toLocaleTimeString()}`,
              });

              this.markers.push(marker);

              // Konum değiştiğinde haritayı güncelle
              const lastMarkerPosition = this.markers[this.markers.length - 1].getPosition();
              this.map.setCenter(lastMarkerPosition);
            }
          });
        });
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
