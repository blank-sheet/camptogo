<template>
  <div :class="{'hidden': hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :onUpdate:currentPage="updateCurrentPage"
      :page-size="pageSize"
      :onUpdate:pageSize="updatePageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { scrollTo } from '../utils/scroll-to'
import { ref, watch } from 'vue'

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50]
  },
  pagerCount: {
    type: Number,
    default: () => (document.body.clientWidth < 992 ? 5 : 7)
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const currentPage = ref(props.page)
const pageSize = ref(props.limit)
const emits = defineEmits(['update:page','update:limit', 'pagination'])

const updateCurrentPage = (val) => {
  currentPage.value = val
}

const updatePageSize = (val) => {
  pageSize.value = val
}

watch(currentPage, (val) => {
  emits('update:page', val)
})

watch(pageSize, (val) => {
  emits('update:limit', val)
})

const handleSizeChange = (val) => {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emits('pagination', { page: currentPage.value, limit: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

const handleCurrentChange = (val) => {
  emits('pagination', { page: val, limit: pageSize.value })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.pagination-container.hidden {
  display: none;
}
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
  background-color: #fff !important;
}
</style>