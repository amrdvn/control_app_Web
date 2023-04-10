<template>
    <div class="menu">
      <h1>Control App</h1>
      <ul>
        <li class="active"><nuxt-link to="/bildirim">Bildirim Gönder</nuxt-link></li>
        <li ><nuxt-link to="/arama">Aramaları Gör</nuxt-link></li>
        <li ><nuxt-link to="/konum">Konumları Gör</nuxt-link></li>
        <li><nuxt-link to="/canli-konum">Canlı Konum</nuxt-link></li>
        <li ><nuxt-link to="/uygulamalar">Uygulamaları Gör</nuxt-link></li>
      </ul>
    </div>
</template>
<style>
a {
  text-decoration: none;
  text-decoration-color: none;
}
</style>