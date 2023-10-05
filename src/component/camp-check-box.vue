<template>
  <!-- Element-Plus 没有单选的checkbox,这里作为补充 -->
  <div style="display: flex" class="ccb">
    <ElCheckbox :label="label1" v-model="value.c1" />
    <ElCheckbox :label="label2" v-model="value.c2" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
const props = defineProps({
  check: {
    default: true
  },
  label1: {
    default: '通过'
  },
  label2: {
    default: '拒绝'
  }
})
const emits = defineEmits(['update:check'])
const value = reactive({
  c1: props.check,
  c2: false
})
watch(
  () => value.c1,
  () => {
    if (value.c1 === value.c2) {
      value.c2 = !value.c1
      emits('update:check', value.c1)
    }
  },
  {immediate:true}
)
watch(
  () => value.c2,
  () => {
    if (value.c1 === value.c2) {
      value.c1 = !value.c2
      emits('update:check', value.c1)
    }
  },
  {immediate:true}

)
</script>

<style lang="scss">
.el-checkbox__label {
  font-weight: 400;
}
</style>
