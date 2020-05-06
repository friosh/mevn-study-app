<template>
  <div class="container my-16 w-full mx-auto">
    <validation-observer
      ref="reg"
      v-slot="{ handleSubmit }"
    >
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="max-w-xs mx-auto">
          <h2 class="text-center text-lg text-orange-700">Sign in</h2>
          <div class="w-full p-6 bg-white shadow mt-5 rounded-sm">
            <validation-provider name="email" rules="required|email" v-slot="v">
              <AppInput
                placeholder="Enter your email"
                type="text"
                name="email"
                v-model="user.email"
                :value="user.email"
                :class="v.classes"
                :errors="v.errors"
              />
            </validation-provider>
            <validation-provider name="password" rules="required|min:6" v-slot="v">
              <AppInput
                placeholder="Enter your password"
                type="password"
                name="password"
                v-model="user.password"
                :value="user.password"
                :class="v.classes"
                :errors="v.errors"
              />
            </validation-provider>
            <btn
              text="Sign in"
              :pending="pending"
              :disabled="pending"
            />
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
  import AppInput from '@components/ui/input/AppInput.vue';
  import { mapActions, mapGetters } from 'vuex';
  import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
  import { required, email, min } from 'vee-validate/dist/rules'
  import Btn from '@components/ui/btn/Btn.vue'

  extend('required', {
    ...required,
    message: 'The {_field_} is required'
  })
  extend('email', email)
  extend('min', {
    ...min,
    params: ['length'],
    message: `The {_field_} must be {length} symbols`
  })
  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid'
    }
  })

  export default {
    name: 'Login',
    components: {
      AppInput,
      ValidationProvider,
      ValidationObserver,
      Btn
    },
    data: () => ({
      user: {
        email: null,
        password: null
      },
      pending: false
    }),
    computed: {
      ...mapGetters({
        userStore: 'user',
        tokenStore: 'token'
      })
    },
    methods: {
      ...mapActions([
        'login',
        'initial'
      ]),
      async onSubmit() {
        this.togglePending()
        const res = await this.login(this.user)
        if (res.error) {
          const {field, msg} = res.data[0]
          console.log({[field]: [msg]})
          this.$refs.reg.setErrors({
            [field]: [msg]
          })
        } else {
          this.$router.push('/')
        }
        this.togglePending()

      },
      togglePending() {
        this.pending = !this.pending
      }
    },
    created() {
      this.initial()
    }
  };
</script>

<style scoped>

</style>
