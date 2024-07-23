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
  import { onBeforeMount, onMounted,ref } from 'vue'
  import CampHeader from '../../../component/camp-header.vue'
  import CampNav from '../../../component/camp-nav.vue'
  import CampBody from '../../../component/camp-body.vue'
  import { useStore } from '../../../store'
  import { useRouter } from 'vue-router'
  const navOptions = [
    {
      label: '保险审核端',
      navTo: '/insurence/audit',
      name: 'insurence-audit'
    }
  ]
  const sideNav = ref([
    {
      label: '保险支持',
      navTo: '/insurence/audit',
      name: 'insurence-audit'
    }
  ])
  const router = useRouter()
  onBeforeMount(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // if (userInfo.role == "AUDITOR") {
    //   sideNav.value = [
    //     {
    //       label: '保险支持',
    //       navTo: '/audit/insurence',
    //       name: 'audit-insurence'
    //     }
    //   ]
    //   router.push(`/audit/insurence`)
    // }
  })
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
  