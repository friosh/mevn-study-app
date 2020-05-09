export default {
  state: {
    messages: [],
  },
  getters: {
    messages: (state) => state.messages,
  },
  actions: {},
  mutations: {
    setFlash(state, message) {
      state.messages.push(message)
    },
    clearFlash(state, id) {
      state.messages = state.messages.filter((message) => message.id !== id)
    },
  },
}
