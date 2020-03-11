<template>
  <button @click="$emit('click')">
    <i :class="'fa fa-' + icon"></i>
    <span>{{ title }}</span>
  </button>
</template>

<script>
  export default {
    props: {
      allowedTabs: {
        type: Array,
        required: false // TODO
      },
      icon: {
        type: String
      },
      title: {
        type: String,
        required: true
      }
    }
  }
</script>
