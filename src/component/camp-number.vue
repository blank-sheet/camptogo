<template>
  <ElInputNumber v-model="_value" @change="handleChange" :min="0" controls-position="right" />
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  number: {
    default: 0
  },
  price: {
    default: 1
  }
})
let canChange = true
const emits = defineEmits(['update:number'])
const handleChange = value => {
  canChange = false
  emits('update:number', Number(value) * props.price || 0)
}
const _value = ref(props.number / props.price)
watch(
  () => props.number,
  newNumber => {
    if (canChange) _value.value = newNumber / props.price
  }
)
</script>
