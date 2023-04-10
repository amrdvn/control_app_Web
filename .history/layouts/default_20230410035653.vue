<template>

      <nuxt/>
   
</template>
	
<script>
import { auth } from '~/plugins/firebase.js'

export default function ({ route, redirect }) {
  auth.onAuthStateChanged(function(user) {
    if (!user && route.path !== '/error') {
      redirect('/error')
    }
  });
}
</script>

