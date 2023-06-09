import colors from 'vuetify/es5/util/colors'


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - control_app_Web',
    title: 'control_app_Web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
      },]
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
    { src: '~/plugins/firebase.js', mode: 'server' },
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  env: {
    FCM_SERVER_KEY: process.env.FCM_SERVER_KEY || 'default_key'
  },
  modules: [
    
      '@nuxtjs/dotenv',
      '@nuxtjs/firebase',
      
  ],
  firebase:{
    config:{
          apiKey: 'AIzaSyDJfEcHwLMIQbTvWiLRSIndDwKFa6Fb420',
          authDomain: 'control-app-a014e.firebaseapp.com',
          projectId: 'control-app-a014e',
          storageBucket: 'control-app-a014e.appspot.com',
          messagingSenderId: '207916838663',
          appId: '1:207916838663:web:1e1d37565881adb32edfa2',
    },
    services: {
      firestore: true,
      auth: true,
      messaging: true
    },

  },

  
  workbox: {
    dev: true,
    enabled: process.env.NODE_ENV === 'production',
    importScripts: [
      'https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js',
    ],
    config: {
      debug: true
    }
  },
  

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
  },
  
};
