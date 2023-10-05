<template>
  <div ref="timeRef">
    <el-time-picker
      format="HH:mm"
      style="margin-right: 10px;width: 150px;"
      v-model="time"
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
  }
})
const emits = defineEmits(['update:time'])
watch(time, () => emits('update:time', time.value))
watch(() => props.initial, useInitial)

onMounted(() => {
  props.initial && useInitial()
})
function useInitial() {
  timeRef.value.querySelector('input')?.setAttribute('value', props.initial)
}
</script>

<style lang="scss" scoped></style>
