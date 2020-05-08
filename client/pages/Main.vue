<template>
  <div class="main">
    <div
      v-if="showConfirmEmailPanel"
      class="w-full h-12 text-orange-600 bg-orange-100 flex items-center justify-center"
    >
      Please, confirm your email. Didn't receive an email?
      <span
        class="border-orange-600 border-b ml-2 cursor-pointer
        hover:border-orange-800
        hover:text-orange-800"
        @click="resendEmail"
      >Click here to resend email</span>
    </div>
    <div class="h-2 w-full bg-orange-500"></div>
    <loader v-if="pending" />
    <div v-else class="main-container">
      <div class="w-full h-12 flex items-center justify-between px-3">
        <div class="text-orange-600">
          <router-link to="/">Mevn</router-link>
        </div>
        <div class="" v-if="!user">
          <router-link class="text-gray-700" to="/auth/login">Login</router-link>
          <router-link class="text-gray-700 rounded-full border-gray-700 border-2 border-solid hover:border-orange-700 hover:text-orange-700 px-3 py-2 ml-3" to="/auth/register">Register</router-link>
        </div>
        <div v-else>
          <router-link class="text-gray-700 w-32" to="/auth/reset/">Reset Password</router-link>
          <button
            class="w-32 ml-3"
            @click="logout"
          >Logout</button>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Btn from '../components/ui/btn/Btn.vue';
  import Loader from '../components/ui/loader/Loader.vue';

  export default {
    name: 'Main',
    components: {Loader, Btn},
    data: () => ({
      pending: true
    }),
    computed: {
      ...mapGetters([
          'user'
      ]),
      showConfirmEmailPanel() {
        return this.user && !this.user.emailConfirmedAt
      }
    },
    methods: {
      ...mapActions({
        initialize: 'initialize',
        logoutStore: 'logout',
        resendConfirmEmail: 'resendConfirmEmail'
      }),
      logout() {
        this.logoutStore()
        this.$router.push('/')
      },
      async resendEmail() {
        const res = await this.resendConfirmEmail()
        if (res) {
          this.$router.push('/')
        }
      }
    },
    async mounted() {
      if (!this.user) {
        await this.initialize()
      }
      this.pending = false
    }
  }
</script>

<style lang="scss">
  .is-invalid {
    color: #d71e1e;
  }

  input.is-valid {
    border: 1px solid #0a9324
  }

  input.is-invalid {
    border: 1px solid #d71e1e
  }

  button[disabled] {
    opacity: .7;
    pointer-events: none;
  }
</style>
