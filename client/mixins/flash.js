import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['messages']),
  },
  methods: {
    ...mapActions(['flash']),
  },
}
