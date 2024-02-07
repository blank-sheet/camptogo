<template>
  <div ref="timeRef">
    <el-time-picker
      format="HH:mm"
      style="margin-right: 10px;width: 150px;"
      v-model="time"
      :disabled="disabled"
      :placeholder="placeholder" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const time = ref('')
const timeRef = ref()
const props = defineProps({
  initial: {
    default: ''
  },
  placeholder: {
    default: '开始时间'
  },
  disabled: {
    default: false
  }
})
const emits = defineEmits(['update:time'])
watch(time, () => emits('update:time', time.value))
watch(() => props.initial, useInitial)

onMounted(() => {
  props.initial && useInitial()
})
function useInitial() {
  time.value = props.initial
  // timeRef.value.querySelector('input')?.setAttribute('value', props.initial)
}
</script>

<style lang="scss" scoped></style>
