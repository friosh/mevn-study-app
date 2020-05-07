const setAuth = (auth, commit) => {
  localStorage.setItem('auth', JSON.stringify(auth.data))
  commit('setAuth', auth.data)
  return auth
}

const getError = (error) => {
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
  return output
}
export default {
  setAuth,
  getError,
}
