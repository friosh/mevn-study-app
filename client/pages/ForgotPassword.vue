<template>
  <div class="container my-16 w-full mx-auto">
    <validation-observer
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <form
        @submit.prevent="handleSubmit(() => onSubmit(restorePassword, user, '/'))"
      >
        <div class="max-w-xs mx-auto">
          <h2 class="text-center text-lg text-orange-700">Restore password</h2>
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
            <btn
              text="Send password"
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
    name: 'ForgotPassword',
    mixins: [formMixin],
    data: () => ({
      user: {
        email: null
      },
    }),
    methods: {
      ...mapActions([
        'restorePassword'
      ]),
    },
  };
</script>

<style scoped>

</style>
