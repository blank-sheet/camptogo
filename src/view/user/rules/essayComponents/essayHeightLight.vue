<template>
  <span class="hightLight">
    <slot></slot>
  </span>
</template>

<script setup>

</script>

<style lang="scss">
.hightLight {
  color: #95D600;
  margin: 0;
  padding: 0;
  overflow: hidden;

  a {
    color: #95D600;
    margin: 0;
    padding: 0;
  }
  img{
    width: 100%;
  }
  .smallImg{
    width: 50%;
  }
}
</style>