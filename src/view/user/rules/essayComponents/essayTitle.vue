<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.title {
  line-height: 1;
  text-align: left;
  color: #000000;
  font-family: PingFang SC;
  font-size: 32px;
  text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  margin: 0;
}
</style>