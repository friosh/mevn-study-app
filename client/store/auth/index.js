const state = {
  error: null,
  token: null,
  user: null,
}

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  error: (state) => state.error,
}

const actions = {
  initialize({ commit }) {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'))
      commit('setAuth', auth)
    } catch (e) {
      console.log(e)
    }
  },
  async postRegister({ commit }, data) {
    try {
      const auth = await api.post('auth/register', data)
      return utils.setAuth(auth, commit)
    } catch (error) {
      return utils.getError(error)
    }
  },
  async login({ commit }, data) {
    try {
      const auth = await api.post('auth/login', data)
      return utils.setAuth(auth, commit)
    } catch (error) {
      return utils.getError(error)
    }
  },
  async logout({ commit }) {
    commit('setAuth', null)
    localStorage.removeItem('auth')
  },
  async restorePassword(context, data) {
    try {
      return await api.post('auth/restore', data)
    } catch (e) {
      return utils.getError(e)
    }
  },
  async resetPassword(context, data) {
    try {
      return await api.post('auth/reset', data)
    } catch (e) {
      return utils.getError(e)
    }
  },
  async confirmEmail(context, token) {
    try {
      return await api.post('auth/confirm-email', { token })
    } catch (e) {
      return utils.getError(e)
    }
  },
  async auth({ commit }, user) {
    return utils.setAuth(user, commit)
  },
  async resendConfirmEmail({}) {
    return await api.post('auth/resend-confirm-email')
  },
}

const mutations = {
  setPeople(state, people) {
    state.people = people
  },
  setAuth(state, auth) {
    if (auth) {
      state.user = auth.user
      state.token = auth.token
    } else {
      state.user = null
      state.token = null
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
