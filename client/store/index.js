import Vue from 'vue'
import Vuex from 'vuex'
import api from '@client/utils/axios'
import utils from '../utils/store.utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    people: null,
    token: null,
    user: null,
  },
  getters: {
    people: (state) => state.people,
    user: (state) => state.user,
    token: (state) => state.token,
  },
  actions: {
    initial({ commit }) {
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
  },
  mutations: {
    setPeople(state, people) {
      state.people = people
    },
    setAuth(state, auth) {
      state.user = auth.user
      state.token = auth.token
    },
  },
})
