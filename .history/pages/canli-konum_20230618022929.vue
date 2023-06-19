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

<style>
/* Diğer stiller */
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
