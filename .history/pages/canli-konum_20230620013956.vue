<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Canlı konum görüntüle</h1>
      <div id="map"></div>
      <div class="location-tracking">
        <span class="label">Canlı konum takibi:</span>
        <label class="radio-label">
          <input type="radio" value="kapali" v-model="takipModu" />
          Kapalı
        </label>
        <label class="radio-label">
          <input type="radio" value="acik" v-model="takipModu" />
          Açık
        </label>
        <button class="onayla-button" @click="onayla">Onayla</button>
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
      takipModu: 'kapali',
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

    window.addEventListener('beforeunload', this.sayfaKapatildi);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.sayfaKapatildi);
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
        .doc(this.user.uid)
        .get();

      if (snapshot.exists) {
        const data = snapshot.data();
        this.takipModu = data.takip === 1 ? 'acik' : 'kapali';
      } else {
        this.takipModu = 'kapali';
      }
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
    onayla() {
      const takipDegeri = this.takipModu === 'acik' ? 1 : 0;
      firebase
        .firestore()
        .collection('logs')
        .doc(this.user.uid)
        .collection('canli_konum')
        .doc(this.user.uid)
        .update({ takip: takipDegeri })
        .then(() => {
          console.log('Takip değeri güncellendi');
                    alert('HATA :Bildirim gönderilemedi..')

        })
        .catch(error => {
          console.log('Takip değeri güncellenirken bir hata oluştu:', error);
        });
    },
    sayfaKapatildi() {
      this.onayla();
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

.onayla-button {
  background-color: #1a8cff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
  