<template>
  <div class="content">
    <h1>{{ pageTitle }}</h1>
    <p>Bu bölümde {{ pageDesc }} bulunmaktadır.</p>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: 'Başlık'
    },
    pageDesc: {
      type: String,
      default: 'içerik'
    }
  }
}
</script>
