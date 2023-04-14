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
    {
      src: '~/plugins/control-app-a014e-firebase-adminsdk-2mmmm-a3ffca7c6e.json',
      // eslint-disable-next-line no-dupe-keys
      src: '~/public/firebase-messaging.js',
      // eslint-disable-next-line no-dupe-keys
      src: '@/plugins/firebase.js'
      
  }],

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

  modules: [
    '@nuxtjs/firebase',
      {
        config: {
          apiKey: '<API_KEY>',
          authDomain: '<PROJECT_ID>.firebaseapp.com',
          databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
          projectId: '<PROJECT_ID>',
          storageBucket: '<BUCKET>.appspot.com',
          messagingSenderId: '<MESSAGING_SENDER_ID>',
          appId: '<APP_ID>',
          measurementId: '<MEASUREMENT_ID>'
        },
        services: {
          messaging: true
        }
      }
      
  ],
 
  messaging: {
    createServiceWorker: false,
    actions: [
      {
        action: 'randomName',
        url: 'randomUrl'
      }
    ],
    fcmPublicVapidKey: 'BFMVehN9w9lkv0fmUmgZjNBivQuzD7rCc19-_grigV3CQ5nxFoOautPwQv0sebpeSBvd_2VJAGKnnBPY-Pv5Qp8' // OPTIONAL : Sets vapid key for FCM after initialization
  },
  workbox: {
    dev: true,
    importScripts: [
      '~/public/firebase-messaging-sw.js'
    ],
    runtimeCaching: [
      {
        urlPattern: 'https://your-api-url.com/.*',
        handler: 'cacheFirst',
        method: 'GET'
      }
    ]
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
