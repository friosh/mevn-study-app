<template>
  <div class="app-input">
    <input
      class="w-full bg-gray-100 focus:outline-none p-3 text-gray-600"
      :type="type"
      :value="value"
      :class="classes"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    >
    <span :class="classes">{{ errors[0] }}</span>
  </div>
</template>

<script>
  export default {
    name: 'AppInput',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      value: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      },
      placeholder: {
        type: String,
        default: null
      },
      classes: {
        type: Array,
        default: () => []
      },
      errors: {
        type: Array,
        default: () => []
      }
    },
  };
</script>

<style scoped lang="scss">
  .app-input {
    margin-bottom: .75em;

    span {
      font-size: 0.75em;
    }
  }

</style>
