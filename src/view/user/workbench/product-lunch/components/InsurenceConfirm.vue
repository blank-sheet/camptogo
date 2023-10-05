<template>
  <ElDialog title="核保结果确认" v-model="visiable" width="750px">
    <p></p>
    <h2>保险价格</h2>
  </ElDialog>
</template>

<script setup lang="ts">
defineProps({
  visiable: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
