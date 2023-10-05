<template>
  <div>
    <CampHeader>
      <CampNav :solid="true" :nav-options="navOptions" />
    </CampHeader>
    <CampBody>
      <template #side>
        <CampNav :column="true" :nav-options="sideNav" style="margin-top: 20px" />
      </template>
      <template #main>
        <main style="padding: 20px">
          <RouterView />
        </main>
      </template>
    </CampBody>
  </div>
</template>

<script setup>
import CampHeader from '../../../component/camp-header.vue'
import CampNav from '../../../component/camp-nav.vue'
import CampBody from '../../../component/camp-body.vue'
const navOptions = [
  {
    label: '审核端',
    navTo: '/audit/basicInfo'
  }
]
const sideNav = [
  {
    label: '基本信息审核',
    navTo: '/audit/basicInfo'
  },
  {
    label: '主理人设置审核',
    navTo: '/audit/provider'
  },
  {
    label: '商品管理审核',
    navTo: '/audit/product'
  },
  {
    label: '保险支持',
    navTo: '/audit/insurence'
  },
  {
    label: '订单管理审核',
    navTo: ''
  },
  {
    label: '资管系统审核',
    navTo: ''
  },
  {
    label: '评价审核',
    navTo: ''
  }
]
</script>

<style lang="scss">
// 审核端的表格中的按钮
.cell {
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-button {
    margin: 5px;
    padding: 8px;
    height: 25px;
    font-size: small;
  }
}
</style>
