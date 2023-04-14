<template>
  <div class="container">
    <menulist />
    <div class="content">
      <h1>Bildirim Gönder</h1>
      <form @submit.prevent="submit">
        <label for="baslik">Başlık:</label><br>
        <input type="text" id="baslik" name="baslik" v-model="title"><br><br>
        <label for="icerik">İçerik:</label><br>
        <textarea id="icerik" name="icerik" v-model="body"></textarea><br><br>
        <button class="btn" type="submit">Bildirim Gönder</button>
      </form>
    </div>
    <oturumacik />
    <footerkismi />
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import footerkismi from '~/components/footer-kismi.vue'
import menulist from '~/components/menu-list.vue'
import oturumacik from '~/components/oturum-acik.vue'

export default {
  components: {
    menulist,
    oturumacik,
    footerkismi
  },
  data() {
    return {
      title: '',
      body: '',
      token: 'fjl-ZNNLQ1-crw5KiLrMF3:APA91bFOIJsdUNjqX52B8zAP1gxg3tSRmUC_KexJaIYfTqhKGq9EJwaTvvHsXtsh7vWVm-kS-yngHEQ0kxkcji_lC1UnV5jiOTF5LaiCJzz6QRAnZylh4HWFSJPEqiwchu_60py72L9_'
    }
  },
  methods: {
    submit() {
      const notification = {
        title: this.title,
        body: this.body,
        icon: '/',
        click_action: 'https://yourwebsite.com/'
      }

      const message = {
        notification,
        token: this.token
      }

      axios.post('https://fcm.googleapis.com/fcm/send', message, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCLsjvZF6//NXMP\n9evszFdOSeV4ldtQiU1lH2nq+u6b0NNGJ+8Uc2Ap8ZAkEBY2A11v6QGf2JzadoNO\n32GEdv+vhE2RezV8YhJDIN10K88vNE6y/R0coC4R/4z0GmhFasI4s9jhaKVPx/wf\nW7kUISEo5zKzpsia/I7CI/rQjc8/qW/XiPdVS3OupY/FFYwFORDoFScz2DNCTym1\ntcrLo5mfmcYvHHD4d78vPZCfNulNdYrpR9WwgB/KaA4t3CSjWyDB5Q/4GGT9pJAq\nYmB1BolPcEDQH0QEZRvNhu7a1am0hg14dkCv8w8pFCf8m2DmpbBiAS62/GZitOQL\numkKcWn1AgMBAAECggEAMCxehxasEo4UB8T+fsJYuR6yi0riPnuavOyAUhAGiKUS\ntna+84Z1+wDafBUwE6BFcHohnUXNkWidD23o6w0+TwCI30plv2bydUO4Gn+hCt42\n5XJzv5NdT8eYi/UvUADoyTT77X9wwnpsb0PqJw7lqH1R9rHlK808Taaqr5C3j3QU\nMML4bdc7kkzZ2C7Nd4qXbgs1S0g+cppskgffIDlxYYyzWkqYXTQic9xdTpJ45jyE\nShQXH1IR0k6sGKW9KrevKXf4hG5DAmQ+eIzmDAdswm1MpnHTBpPLfFpENEWQEnmy\nTiQ9ZUJZmMBHo9FoaJnILScAWDbli2l3r2dZg+xBYQKBgQDBD134DiLjT/QjXCGN\niwZGH7r5Zis28oatCRBp56JOYyYJcI8LZK+5AScpLE38/9UiY4puupA9XbK3MMst\neOikCJNkKMdL1KHk45V20BWhx6jJNpFwKtsqge5OHDmw2qgp9RMYO85VSx9HTTao\nLA5tSHaRsTPMXkMtp8bU/wkyxwKBgQC5PSrNbZW+kYaaqNUek0yhXMHPTe4fE8h/\nEhbpXMtbbFInDWodoLBgWLErPojII1Ypjswo2QQUZaJrHR/xRTczZlJIcOe21Kbz\nzvadD3KSavBY1mCAS0eV8v7uVNYZvteU8q89AeAMqHhFf4jUtSD+sbNrpNRRIhaD\nojfN6dABYwKBgAc/6XpwJXU9wmA1jHkBOHoXpPDKmmLU1qPWzEv9y8V/yaTfGjAG\nVubumSbdqAwRG1LQRBmGXfY/938TkP2jJbFLNSW0tk8tq+qpdSpiA/3wPnFX4DxD\nD7nX6Tf7rVrryxbQQihNzqC7UnBeAOhtxxjpeLJd4iERhRpIy5mh/hlvAoGAJMft\neM7anfVdadY+QwzyeVPms9gAgTE3bWvVGs8vHd8bTN/QA0QF4Yua2kBXfo3trODK\nzw2QTtCDeItW7VxWAqG9kt7AU8BTyjN9KmCH2mTbhnhCvxazhyWx0vcLcB9BxTSO\n8SkvKLRG9V3GeJ3iiFAWlTgsZFPFbqvGMt/LSosCgYBewhkY1aK2CPRO3UI4bl0g\nnSDVGmYHrfz9Jl+R/qk76rPra4krQaELr7A4yEkQBp+Uwwe24iGrKV5ND9t9I7YK\n9VRsNVf9F6OFUJrtqSLd+sl0F1zEHP40VrS2eT9IttYsh/ZhTWBUEqqvBGTDuyPe\nCsoemz/h7e6xAXXMOp1e/g=='
        }
      })
      .then(response => {
        console.log('Notification sent successfully:', response.data)
        this.title = ''
        this.body = ''
      })
      .catch(error => {
        console.error('Error sending notification:', error)
      })
    }
  }
}
</script>
