import Vue from 'vue'
import Vuex from 'vuex'
import api from '@client/utils/axios'

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
        console.log(auth)
        localStorage.setItem('auth', JSON.stringify(auth.data))
        commit('setAuth', auth.data)

        return auth
      } catch (error) {
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
    },
    async init({ commit }) {
      //
    },
    async login({ commit }, data) {
      try {
        const auth = await api.post('auth/login', data)
        localStorage.setItem('auth', JSON.stringify(auth.data))
        commit('setAuth', auth.data)

        return auth
      } catch (error) {
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
