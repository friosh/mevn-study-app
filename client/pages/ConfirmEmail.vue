<template>
  <div class="confirm-email">
    <h1>Confirm email</h1>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ConfirmEmail',
    async mounted() {
      const token = this.$route.params.token
      try {
        const user = await this.confirmEmail(token)
        const response = await this.auth(user)
        console.log(response);
        if (!response.error) {
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e);
      }
    },
    methods: {
      ...mapActions(['confirmEmail', 'auth'])
    }
  };
</script>

<style scoped>

</style>
