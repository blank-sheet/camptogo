<template>
  <el-header style="height: 64px">
    <img style="cursor: pointer; height: 30px" @click="router.push('/')" class="logo" src="../assets/camptogoLogo.png" />
    <div style="display: flex">
      <slot></slot>
      <div class="user">
        <img src="../assets/img_v2_f3f28152-31d3-4b54-a7d0-ccc3efd2b22g.png" fit="fill" />
        <div style="font-size: 16px;">{{ store.user?.username }}</div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const store = useStore()
const router = useRouter()
</script>

<style lang="scss">
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  box-shadow: -1px 4px 6px 0px rgb(0 0 0 / 8%);
  font-size: 2vh;

  .logo {
    width: 180px;
    height: 30px;
    margin-left: 10px;
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
