import api from '@client/utils/axios'
import utils from '@client/utils/store.utils'

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
  async postRegister({ commit, dispatch }, data) {
    try {
      const auth = await api.post('auth/register', data)
      dispatch('flash', { message: 'Thanks for registration!' })
      return utils.setAuth(auth, commit)
    } catch (error) {
      return utils.getError(error, dispatch)
    }
  },
  async login({ commit }, data) {
    try {
      const auth = await api.post('auth/login', data)
      return utils.setAuth(auth, commit)
    } catch (error) {
      return utils.getError(error, dispatch)
    }
  },
  async logout({ commit, dispatch }) {
    commit('setAuth', null)
    dispatch('flash', { message: 'Bye, Bye!' })
    localStorage.removeItem('auth')
  },
  async restorePassword({ dispatch }, data) {
    try {
      const output = await api.post('auth/restore', data)
      dispatch('flash', { message: 'Check your email for restoring password!' })
      return output
    } catch (e) {
      return utils.getError(e, dispatch)
    }
  },
  async resetPassword({ dispatch }, data) {
    try {
      const output = await api.post('auth/reset', data)
      dispatch('flash', { message: 'Password changed successfully!' })
      return output
    } catch (e) {
      return utils.getError(e, dispatch)
    }
  },
  async confirmEmail({ dispatch }, token) {
    try {
      const confirmed = await api.post('auth/confirm-email', { token })
      dispatch('flash', { message: 'Thanks for confirming email!' })
      return confirmed
    } catch (e) {
      return utils.getError(e, dispatch)
    }
  },
  async auth({ commit }, user) {
    return utils.setAuth(user, commit)
  },
  async resendConfirmEmail({ dispatch }) {
    const resent = await api.post('auth/resend-confirm-email')
    dispatch('flash', {
      message: 'We sent you new email for restoring password',
    })
    return resent
  },
}

const mutations = {
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
