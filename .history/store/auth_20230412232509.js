// // import firebase from '~/plugins/firebase.js'

// // export const state = () => ({
// //   user: null,
// //   error: null
// // })

// // export const mutations = {
// //   SET_USER(state, user) {
// //     state.user = user
// //   },
// //   SET_ERROR(state, error) {
// //     state.error = error
// //   }
// // }

// // export const actions = {
// //   async signInWithEmailAndPassword({ commit }, { email, password }) {
// //     try {
// //       const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
// //       const user = userCredential.user
// //       commit('SET_USER', user)
// //     } catch (error) {
// //       commit('SET_ERROR', error)
// //       throw error
// //     }
// //   },
// //   async signOut({ commit }) {
// //     try {
// //       await firebase.auth().signOut()
// //       commit('SET_USER', null)
// //     } catch (error) {
// //       commit('SET_ERROR', error)
// //       throw error
// //     }
// //   }
// // }
