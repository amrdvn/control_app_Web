<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Canlı konum görüntüle</h1>
      <div id="map"></div>
      <div class="location-tracking">
        <span class="label">Canlı konum takibi:</span>
        <label class="radio-label">
          <input type="radio" value="kapali" v-model="trackingMode" />
          <span class="radio-button"></span>
          Kapalı
        </label>
        <label class="radio-label">
          <input type="radio" value="acik" v-model="trackingMode" />
          <span class="radio-button"></span>
          Açık
        </label>
        <button class="confirm-button" @click="onayla">Onayla</button>
      </div>
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`;
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
    },
    mapYukle() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.markers.length > 0 ? this.markers[0].getPosition().lat() : 41.0174,
          lng: this.markers.length > 0 ? this.markers[0].getPosition().lng() : 28.9883
        },
        zoom: 8,
      });

      this.markerGetir();

      firebase
        .firestore()
        .collection('logs')
        .doc(this.user.uid)
        .collection('canli_konum')
        .onSnapshot(querySnapshot => {
          this.markers.forEach(marker => {
            marker.setMap(null); 
          });
          this.markers = []; 

          querySnapshot.forEach(doc => {
            const data = doc.data();
            const marker = new google.maps.Marker({
              position: { lat: data.latitude, lng: data.longitude },
              map: this.map,
              title: `${new Date(data.tarih).toLocaleDateString()} ${new Date(data.tarih).toLocaleTimeString()}`,
            });

            this.markers.push(marker); 
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
.location-tracking {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.label {
  margin-right: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 14px;
}

.radio-button {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #0000FF;
  background-color: #0000FF;
  margin-right: 6px;
}

.confirm-button {
  background-color: #0000FF;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
