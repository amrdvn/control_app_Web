<template>
  <div class="content">
    <h1>{{ pageTitle }}</h1>
    
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: 'Başlık'
    },
    
  }
}
</script>
