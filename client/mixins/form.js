import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import AppInput from '@components/ui/input/AppInput.vue'
import Btn from '@components/ui/btn/Btn.vue'

extend('required', {
  ...required,
  message: 'The {_field_} is required',
})
extend('email', email)
extend('confirmed', {
  ...confirmed,
  message: 'Repeated password doesnt match with new password',
})
extend('min', {
  ...min,
  params: ['length'],
  message: `The {_field_} must be {length} symbols`,
})
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
})

export default {
  data: () => ({
    pending: false,
  }),
  components: {
    AppInput,
    Btn,
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    togglePending() {
      this.pending = !this.pending
    },
    async onSubmit(method, formData, to = null) {
      this.togglePending()
      console.log(res)
      const res = await method(formData)
      if (res.error) {
        const { field, msg } = res.data[0]
        this.$refs.form.setErrors({
          [field]: [msg],
        })
      } else {
        to ? this.$router.push(to) : null
      }
      this.togglePending()
    },
  },
}
