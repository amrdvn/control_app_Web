import { auth } from '~/plugins/firebase'

async signInWithEmailAndPassword({ commit }, payload) {
    const { email, password } = payload
    await this.$fireAuth.signInWithEmailAndPassword(email, password)
  }
  