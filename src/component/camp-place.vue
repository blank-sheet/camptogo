<template>
  <div ref="cRef">
    <el-cascader
      style="min-width: 250px"
      v-model="selectedOptions"
      :options="regionData"
      :placeholder="placeholder">
    </el-cascader>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { regionData, CodeToText } from 'element-china-area-data'
const selectedOptions = ref([])
const props = defineProps({
  location: {
    default: ''
  },
  placeholder: {
    default: '请选择地点'
  }
})
const isArr = computed(() => {
  return props.location instanceof Array
})
const emits = defineEmits(['update:location'])
const cRef = ref(null)
watch(selectedOptions, () => {
  var loc = ''
  for (let i = 0; i < selectedOptions.value.length; i++) {
    if (i !== selectedOptions.value.length - 1) {
      loc += CodeToText[selectedOptions.value[i]] + '\/'
    } else {
      loc += CodeToText[selectedOptions.value[i]]
    }
  }
  emits('update:location', loc.split('\/').filter(Boolean))
  // emits('update:location', isArr.value ? loc.split('\/').filter(Boolean) : loc.replace(/\//g, ''))
})
watch(() => props.location, useInitial)

onMounted(() => {
  props.location && useInitial()
})
function useInitial() {
  cRef.value
    ?.querySelector('input')
    .setAttribute('value', isArr.value ? props.location.join('\/') : props.location)
}
</script>

<style lang="scss" scoped></style>