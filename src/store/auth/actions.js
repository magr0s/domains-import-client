import firebase from 'firebase/app'
import 'firebase/auth'

const signIn = function ({ commit }, { email, password }) {
  commit('RESET_USER')

  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      const token = await firebase.auth().currentUser.getIdToken()

      commit('SET_USER', { user, token })
    })
}

const signOut = function ({ commit }) {
  return firebase.auth().signOut()
    .then(() => (commit('RESET_USER')))
}

const checkAuthenticity = function ({ commit }) {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await firebase.auth().currentUser.getIdToken()

        commit('SET_USER', { user, token })
      } else {
        commit('RESET_USER')
      }

      return resolve(!!user)
    })
  })
}

export {
  signIn,
  signOut,
  checkAuthenticity
}
