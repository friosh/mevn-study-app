const setAuth = (auth, commit) => {
  localStorage.setItem('auth', JSON.stringify(auth.data))
  commit('setAuth', auth.data)
  return auth
}

const getError = (error, dispatch) => {
  const output = {
    error: true,
    data: [],
  }
  Object.keys(error.response.data).forEach((field) => {
    output.data.push({
      field,
      msg: error.response.data[field],
    })
  })
  dispatch('flash', { message: output.data[0].msg })
  return output
}
export default {
  setAuth,
  getError,
}
