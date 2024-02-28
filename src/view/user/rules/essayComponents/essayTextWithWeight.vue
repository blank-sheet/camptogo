<template>
  <span class="text" :style="{ 'text-decoration': line ? 'underline' : '' }">
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({
  line: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.text {
  font-weight: 550;
  color: #262626;
}
</style>