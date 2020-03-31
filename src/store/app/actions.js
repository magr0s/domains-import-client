const setSettingsDrawer = ({ commit }, value) => (
  commit('SET_SETTINGS_DRAWER', value)
)

const setProcess = ({ commit }, value = 'waiting') => (
  commit('SET_PROCESS', value)
)

export {
  setSettingsDrawer,
  setProcess
}
