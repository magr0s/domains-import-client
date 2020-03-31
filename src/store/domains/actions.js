import Utils from 'src/libs/utils'
import axios from 'axios'

const setList = ({ commit }, payload) => (
  commit('SET_LIST', payload)
)

const updateDomain = ({ commit }, payload) => (
  commit('UPDATE_DOMAIN', payload)
)

const importDomain = (__, body) => (
  axios.post(Utils.makeURL('domains/import'), body)
)

export {
  setList,
  updateDomain,
  importDomain
}
