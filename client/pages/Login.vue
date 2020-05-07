<template>
  <div class="container my-16 w-full mx-auto">
    <validation-observer
      ref="reg"
      v-slot="{ handleSubmit }"
    >
      <form
        ref="form"
        @submit.prevent="handleSubmit(() => onSubmit(login, user, '/'))"
      >
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
            <div class="-mt-4 mb-4">
              <router-link to="/auth/restore" class="no-underline text-xs text-orange-500">
                Forgot password?
              </router-link>
            </div>
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
  import formMixin from '@client/mixins/form'
  import { mapActions, mapGetters } from 'vuex';


  export default {
    name: 'Login',
    mixins: [formMixin],
    data: () => ({
      user: {
        email: null,
        password: null
      }
    }),
    computed: {
      ...mapGetters({
        userStore: 'user',
        tokenStore: 'token'
      })
    },
    methods: {
      ...mapActions([
        'login'
      ]),
    },
  };
</script>

<style scoped>

</style>
