<template>
  <div ref="timeRef">
    <el-time-select
      style="margin-right: 10px; width: 150px"
      :model-value="time"
      @change="(newVal) => emits('update:time',newVal)"
      start="00:00"
      end="24:00"
      step="00:15"
      :placeholder="placeholder" />   
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
  time:{
    default:''
  },
  initial: {
    default: ''
  },
  placeholder: {
    default: '开始时间'
  }
})
const timeRef = ref()
const emits = defineEmits(['update:time'])
watch(() => props.initial, useInitial)
onMounted(() => {
  props.initial && useInitial()
})
function useInitial() {
  timeRef.value.querySelector('input')?.setAttribute('value', props.initial)
}
</script>

<style lang="scss" scoped></style>
