<template>
  <div>
    <div
      class="w-full h-12 text-white flex items-center justify-center"
      v-for="message in messages"
      :key="message.id"
      :class="{'bg-green-300': message.type === 'success', 'bg-red-500': message.type === 'error'}"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Flash'
  };
</script>

<style scoped>

</style>
