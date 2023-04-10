import Vuex from 'vuex'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      isLoggedIn: (state) => {
        return !!state.user
      }
    },
    mutations: {
      SET_USER: (state, user) => {
        state.user = user
      }
    },
    actions: {
      signIn({ commit }, { email, password }) {
        return new Promise((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const user = userCredential.user
              commit('SET_USER', user)
              resolve(user)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      signOut({ commit }) {
        return new Promise((resolve, reject) => {
          firebase.auth().signOut()
            .then(() => {
              commit('SET_USER', null)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      init({ commit }) {
        return new Promise((resolve, reject) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              commit('SET_USER', user)
            } else {
              commit('SET_USER', null)
            }
            resolve()
          })
        })
      }
    }
  })
}

export default createStore
