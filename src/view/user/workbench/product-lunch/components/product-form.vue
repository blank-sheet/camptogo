<template>
  <div class="product-form">
    <header :id="id" v-view="fn">
      {{ title }}
    </header>
    <div class="form">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    default: '标题'
  },
  id: {
    default: ''
  }
})
const emits = defineEmits(['update:active'])
const fn = () => {
  emits('update:active', props.id)
}
</script>

<style lang="scss">
.product-form {
  background-color: white;
  margin: 20px 30px 0;
  width: 816px;
  padding: 56px 20px 16px 16px;
  position: relative;
  > header {
    padding-left: 16px;
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    line-height: 56px;
    width: 816px;
    border-bottom: 1px solid #e4dfdf;
    font-weight: bold;
  }
  .el-radio__label {
    font-weight: 400;
  }
  .el-form {
    padding-left: 10px;
  }
  .el-form-item {
    margin: 16px 0;
  }
  .el-input-number {
    width: 88px;
  }
  .el-textarea {
    width: auto;
    min-width: 400px;
    textarea {
      height: 120px;
    }
  }
  .el-form-item__content {
    > .el-input {
      width: auto;
    }
  }
}
</style>
