<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
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

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi,
  },
  mounted() {
    // Google Maps API'ye yükleme yapılır
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY`;
    script.defer = true;
    script.async = true;
    script.onload = this.initMap;
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      // Harita özellikleri belirlenir
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.4219983, lng: -122.084 },
        zoom: 8,
      });

      // Marker oluşturulur
      const marker = new google.maps.Marker({
        position: { lat: 37.4219983, lng: -122.084 },
        map: map,
        title: "Konum",
      });

      // InfoWindow oluşturulur
      const infowindow = new google.maps.InfoWindow({
        content: "Konum",
      });

      // Marker'a tıklandığında InfoWindow açılır
      marker.addListener("click", () => {
        infowindow.open(map, marker);
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