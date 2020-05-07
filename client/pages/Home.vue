<template>
  <div class="my-32">
    <h1 class="text-center text-gray-700">
      Mevn Auth {{ user && user.name ? `of ${ user.name }` : '' }}
    </h1>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['user'])
    }
  };
</script>

<style scoped>

</style>
