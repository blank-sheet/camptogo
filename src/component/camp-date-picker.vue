<template>
  <el-date-picker
    :value-format="valueFormat"
    type="date"
    style="margin-right: 10px"
    v-model="_date"
    :disabled="disabled"
    :placeholder="placeholder" />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    default: '请选择日期'
  },
  date: {
    default: ''
  },
  valueFormat: {
    default: 'YYYY-MM-DDTHH:mm'
  },
  disabled: {
    default: false
  }
})

const _date = ref(props.date)
const emits = defineEmits(['update:date'])
watch(
  () => props.date,
  () => {
    _date.value = props.date
  }
)
watch(_date, () => {
  emits('update:date', _date.value)
})
</script>
