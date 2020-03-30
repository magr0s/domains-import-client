import { firestoreAction } from 'vuexfire'

import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.initializeApp(require('../../configs/firebase.json')).firestore()

const bind = (firestoreAction(({ bindFirestoreRef, state: { collection } }) => (bindFirestoreRef('list', db.collection(collection), {
  serialize: doc => {
    const { id } = doc

    return { ...doc.data(), id }
  }
}))))

export {
  bind
}
