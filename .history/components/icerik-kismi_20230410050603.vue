<template>
    <div class="content">
			<h1>{{ $route.meta.title }}</h1>
			<p>Bu bölümde  özelliği bulunmaktadır.</p>
		</div>
</template>
<script>
export default {
  computed: {
    pageTitle() {
      return "Bildirim";
    }
  }
}
</script>