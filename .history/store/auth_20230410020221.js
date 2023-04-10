import { auth } from '~/plugins/firebase'

export const state = {}

export const mutations = {}

export const actions = {
  async signInWithEmailAndPassword ({ commit }, { email, password }) {
   
      await auth.signInWithEmailAndPassword(email, password)
    
  }
}
