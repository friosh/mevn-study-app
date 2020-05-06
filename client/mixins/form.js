export default {
  data: () => ({
    pending: false
  }),
  methods: {
    togglePending() {
      this.pending = !this.pending
    }
  }
}
