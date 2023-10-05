<template>
  <div>
    <CampAuditTable />
    <CampPagination />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CampAuditTable from '../../../component/camp-audit-table.vue'
import CampPagination from '../../../component/camp-pagination.vue'
import { request } from '../../../api'
import { auditApi } from '../../../api/modules/audit'
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
