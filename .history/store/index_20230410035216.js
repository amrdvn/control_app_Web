import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoggedIn: false,
    redirectPath: '/',
    errorMessage: ''
  },
  mutations: {
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value
    },
    setRedirectPath(state, value) {
      state.redirectPath = value
    },
    setErrorMessage(state, value) {
      state.errorMessage = value
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      // Do your authentication logic here
      if (email === 'test@example.com' && password === 'password') {
        commit('setIsLoggedIn', true)
        commit('setRedirectPath', '/')
      } else {
        commit('setErrorMessage', 'Invalid email or password')
        commit('setRedirectPath', '/error')
      }
    },
    logout({ commit }) {
      commit('setIsLoggedIn', false)
      commit('setRedirectPath', '/login')
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    getErrorMessage: state => state.errorMessage,
    getRedirectPath: state => state.redirectPath
  }
})

export default store
