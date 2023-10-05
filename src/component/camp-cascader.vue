<template>
  <ElCascader
    class="camp-cascader"
    :props="prop"
    v-on:change="cascaderChange"
    :model-value="value"
    :options="options">
    <template #default="{ data }">
      <span class="content">{{ data.label }}</span>
    </template>
  </ElCascader>
</template>

<script setup>
import { ElCascader } from 'element-plus'
import { watch, ref, defineProps } from 'vue'
const prop = {
  emitPath: false
}
const emits = defineEmits(['update:value'])
const props = defineProps({
  options: {
    default: []
  },
  placeholder: '请选择',
  _value: {
    default: 1
  },
  cascaderChange:{
    default:()=>{

    }
  }
})
const value = ref(props._value)
watch(value, () => {
  emits('update:value', value)
})
</script>

<style lang="scss">
.camp-cascader {
  min-width: 250px;
}
li.el-cascader-node {
  height: auto;
  .content {
    display: inline-block;
    max-width: 700px;
    white-space: normal;
  }
}
</style>
