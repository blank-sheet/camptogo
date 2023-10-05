<template>
  <footer>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @current-change="handleCurrentChange" />
  </footer>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElPagination } from 'element-plus'
defineProps({
  total: {
    default: 100
  }
})
const currentPage = ref(1)
const pageSize = ref(10)
const emits = defineEmits(['changePage'])
const handleCurrentChange = () => {
  emits('changePage', currentPage.value, pageSize.value)
}
watch(pageSize, () => {
  emits('changePage', currentPage.value, pageSize.value)
})
</script>

<style scoped>
footer {
  position: fixed;
  background-color: white;
  width: 100%;
  height: 80px;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99;
  box-shadow: -1px -3px 5px 2px rgb(0 0 0 / 4%);
}
</style>
