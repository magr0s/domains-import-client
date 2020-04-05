const SET_USER = (state, { user, token }) => {
  const { uid, displayName, email } = user

  state.user = { uid, displayName, email }
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
