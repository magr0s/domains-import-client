const SET_USER = (state, { user, token }) => {
  state.user = user
  state.token = token
}

const RESET_USER = state => {
  state.user = null
  state.token = null
}

export {
  SET_USER,
  RESET_USER
}
