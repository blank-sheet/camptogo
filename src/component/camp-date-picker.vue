<template>
  <el-date-picker :value-format="valueFormat" :type="type" style="margin-right: 10px" v-model="_date"
    :placeholder="placeholder" :disabled="disabled" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    default: '请选择日期'
  },
  disabled: {
    default: false
  },
  date: {
    default: ''
  },
  valueFormat: {
    default: 'YYYY-MM-DDTHH:mm'
  },
  disabled: {
    default: false
  },
  type:{
    default:'date'
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
