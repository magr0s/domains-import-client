const SET_LIST = (state, payload) => {
  state.list = payload.map((name, i) => ({
    name,
    __key: i,
    status: 'pending'
  }))
}

const UPDATE_DOMAIN = (state, payload) => {
  const { __key: key } = payload
  const { list } = state

  state.list = list.map((domain) => {
    const { __key } = domain

    return __key === key ? payload : domain
  })
}

export {
  SET_LIST,
  UPDATE_DOMAIN
}
