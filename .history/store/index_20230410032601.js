import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoggedIn: false
}

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value
  }
}

const actions = {
  login({ commit }) {
    commit('SET_LOGGED_IN', true)
  },
  logout({ commit }) {
    commit('SET_LOGGED_IN', false)
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
