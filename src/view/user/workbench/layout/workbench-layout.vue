<template>
  <camp-body>
    <template #side>
      <camp-nav style="margin-top: 20px" :column="true" :nav-options="navs" />
    </template>
    <template #main>
      <router-view />
    </template>
  </camp-body>
</template>

<script setup>
import campBody from '../../../../component/camp-body.vue'
import campNav from '../../../../component/camp-nav.vue'
const navs = [
  {
    label: '基础信息',
    navTo: '/user/workbench/basicInfo',
    name:'user-basicInfo'
  },
  {
    label: '主理人设置',
    navTo: '/user/workbench/provider-setting',
    name:'user-provider-setting'
  },
  {
    label: '商品发布',
    navTo: '/user/workbench/productLunch',
    name:'user-productLunch'
  },
  {
    label: '商品管理',
    navTo: '/user/workbench/product-manage',
    name:'user-product-manage'
  },
  {
    label: '审核进度',
    navTo: '/user/workbench/progress',
    name:'user-progress'
  },
  {
    label: '使用反馈',
    navTo: '/user/workbench/feedback',
    name:'user-feedback'
  },
  {
    label: '订单管理',
    navTo: '/user/workbench/manager-ordering',
    name:'user-manager-ordering'
  }
]
</script>

<style lang="scss">
.el-aside {
  min-width: 200px;
}
</style>
