import { v4 as uuid } from 'uuid'

export default {
  state: {
    messages: [],
  },
  getters: {
    messages: (state) => state.messages,
  },
  actions: {
    flash({ commit }, { message, type }) {
      type = type ? type : 'success'
      const id = uuid()
      commit('setFlash', { id, type, message })
      setTimeout(() => {
        commit('clearFlash', id)
      }, 3000)
    },
  },
  mutations: {
    setFlash(state, message) {
      state.messages.push(message)
    },
    clearFlash(state, id) {
      state.messages = state.messages.filter((message) => message.id !== id)
    },
  },
}
