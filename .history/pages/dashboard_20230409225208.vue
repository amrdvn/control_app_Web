<template>
<html>
	<head><title>Control App Web Paneli</title></head>
 	<body>
	<div class="container">
		<menu-list/>
		<icerik-kismi/>
		<footer/>
	</div>
</body>
</html>
</template>
	
	<script>
import footer-kismi from '~/components/footer-kismi.vue'
import icerik-kismi from '~/components/icerik-kismi.vue'
import menu-list from '~/components/menu-list.vue'

export default {
  components: {
	menu-list
  },
}
</script>

	<style>
	html {
  background-color: #f6f8fa;
}
		body {
			margin: 0;
			padding: 0;
			background-color: #f6f8fa;
			font-family: Arial, sans-serif;
			  overflow-x: hidden;

		}

		.container {
			display: flex;
			height: 100vh;
			flex-direction: row;
			overflow: hidden;
			  flex-grow: 1;
		}

		.menu {
			background-color: #f6f8fa  ;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
			padding: 20px;
			flex-basis: 250px;
			flex-shrink: 0;
		}

		.menu h1 {
			margin-top: 0;
			font-size: 24px;
			font-weight: 600;
			color: #4a4a4a;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		.menu ul {
			list-style: none;
			margin: 20px 0;
			padding: 0;
		}

		.menu li {
			padding: 10px;
			cursor: pointer;
			transition: all 0.3s ease;
			border-radius: 5px;
			margin-bottom: 5px;
		}

		.menu li:hover {
			background-color: #D7D0C8;
		}

		.menu li.active {
			background-color: #f5f5f5;
			color: #3c3c3c;
			box-shadow: inset 5px 0 0 #1a8cff;
		}

		.content {
			flex: 1;
			padding: 20px;
			background-color: #fff;
			overflow: auto;
		}
		.footer {
  background-color: #e9ecef  ;
  color: #4a4a4a;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
	</style>
