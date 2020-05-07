<template>
  <div class="container my-16 w-full mx-auto">
    <validation-observer
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <form @submit.prevent="handleSubmit(() => onSubmit(postRegister, user))">
        <div class="max-w-xs mx-auto">
          <h2 class="text-center text-lg text-orange-700">Register</h2>
          <div class="w-full p-6 bg-white shadow mt-5 rounded-sm">
            <validation-provider name="name" rules="required|min:3" v-slot="v">
              <AppInput
                placeholder="Enter your name"
                name="name"
                type="text"
                :class="v.classes"
                :value="user.name"
                :errors="v.errors"
                v-model="user.name"
              />
            </validation-provider>
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
              text="Sign up"
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
    name: 'Register',
    mixins: [formMixin],
    data: () => ({
      user: {
        name: null,
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
          'postRegister'
      ]),
    },
  };
</script>

<style scoped>

</style>
