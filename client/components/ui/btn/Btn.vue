<template>
  <button
    class="w-full mt-3 py-3 bg-green-300 focus:outline-none hover:bg-green-400 rounded-sm text-white font-bold"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <loader v-if="pending" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<script>
  import Loader from '@components/ui/loader/Loader.vue'
  export default {
    name: 'Btn',
    components: {
      Loader
    },
    props: {
      text: String,
      disabled: Boolean,
      pending: Boolean
    }
  };
</script>

<style scoped>
  button {
    display: flex;
    justify-content: center;
  }
</style>
