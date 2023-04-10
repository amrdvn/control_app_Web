import { auth } from '~/plugins/firebase'

export const state = {}

export const mutations = {}

async signInWithEmailAndPassword({ commit }, payload) {
    const { email, password } = payload
    await this.$fireAuth.signInWithEmailAndPassword(email, password)
  }
  