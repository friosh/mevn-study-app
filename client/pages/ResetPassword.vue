<template>
  <div class="container my-16 w-full mx-auto">
    <validation-observer
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <form
        @submit.prevent="handleSubmit(() => onSubmit(reset, password, '/'))"
      >
        <div class="max-w-xs mx-auto">
          <h2 class="text-center text-lg text-orange-700">Reset password</h2>
          <div class="w-full p-6 bg-white shadow mt-5 rounded-sm">
            <validation-provider name="password" rules="required|min:6" v-slot="v">
              <AppInput
                placeholder="Enter new password"
                type="password"
                name="password"
                v-model="password"
                :value="password"
                :class="v.classes"
                :errors="v.errors"
              />
            </validation-provider>
            <btn
              text="Reset"
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
    name: 'ResetPassword',
    mixins: [formMixin],
    data: () => ({
      password: null
    }),
    methods: {
      ...mapActions([
        'resetPassword'
      ]),
      reset(password) {
        return this.resetPassword({password, token: this.$route.params.token})
      }
    },
  };
</script>

<style scoped>

</style>
