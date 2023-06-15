<template>
  <div class="menu">
    <h1>Control App</h1>
    <ul>
      <li><nuxt-link to="/bildirim" exact class="link">Bildirim Gönder</nuxt-link></li>
      <li><nuxt-link to="/arama" exact class="link">Aramaları Gör</nuxt-link></li>
      <li><nuxt-link to="/konum" exact class="link">Konum Geçmişi</nuxt-link></li>
      <li><nuxt-link to="/canli-konum" exact class="link">Canlı Konum</nuxt-link></li>
      <li><nuxt-link to="/uygulamalar" exact class="link">Uygulama Geçmişi</nuxt-link></li>
      <li><nuxt-link to="/uygulama-kaldir" exact class="link">Uygulama Kısıtı</nuxt-link></li>
    </ul>
  </div>
</template>

<style>
.link {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  padding: 10px;
}

.link.router-link-active {
  background-color: #f5f5f5;
              color: #3c3c3c;
              box-shadow: inset 5px 0 0 #1a8cff;
}
</style>
