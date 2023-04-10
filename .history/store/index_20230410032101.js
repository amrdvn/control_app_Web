import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    isLoggedIn: false
  }
  const mutations = {
    setLoggedIn(state, value) {
      state.isLoggedIn = value
    }
  }
    