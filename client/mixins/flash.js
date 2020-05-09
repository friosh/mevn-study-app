import { mapMutations, mapGetters } from 'vuex'
import { v4 as uuid } from 'uuid'

export default {
  computed: {
    ...mapGetters(['messages']),
  },
  methods: {
    ...mapMutations(['setFlash', 'clearFlash']),
    flash(message, type = 'success') {
      const id = uuid()
      this.setFlash({ id, type, message })
      setTimeout(() => {
        this.clearFlash(id)
      }, 3000)
    },
  },
}
