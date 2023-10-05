<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="index" label="序号" width="70">
      <template #default="scope"></template>
    </el-table-column>
    <el-table-column prop="name" label="创建时间" width="180">
      <template #default="scope"> {{ scope.row.date }}</template> </el-table-column
    >bm
    <el-table-column prop="name" label="申请理由" width="180">
      <template #default="scope">dwadawdwa</template>
    </el-table-column>
    <el-table-column prop="name" label="详情" width="80">
      <template #default="scope">
        <el-button text>查看</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="审核时间" width="180">
      <template #default="scope">
        {{ scope.row.date }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="审核意见" width="180">
      <template #default="scope"></template>
    </el-table-column>
    <el-table-column prop="name" label="审核人" width="120">
      <template #default="scope"></template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="180">
      <template #default="scope">
        <el-button type="success">通过</el-button>
        <el-button>拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style lang="scss" scoped>
.el-table {
  --el-table-header-bg-color: #f5f5f5;
  margin-left: 24px;

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

thead {
  color: #000000;
}
</style>
