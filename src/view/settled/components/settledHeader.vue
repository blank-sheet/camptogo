<template>
  <div class="settledHeader">
    <div class="left">
      <img src="../../../assets/icon/fog.svg" alt=""><span>&emsp13;|&emsp13;{{ title }}</span>
    </div>
    <div class="right">
      <span>已有帐号？</span>
      <span style="color:#578A00;cursor: pointer;" @click="handlerLogin()">请点此登录</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  }
})

const handlerLogin = ()=>{
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.settledHeader {
  width: 100vw;
  height: 9vh;
  background: #95D600;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  .left {
    display: flex;
    padding-left: 2vw;
    height: 100%;

    img {
      width: 7.5vh;
      height: 7.5vh;
      margin: auto 0;
    }

    span {
      height: 7.5vh;
      line-height: 7.5vh;
      color: #fff;
      font-family: 'PingFang SC';
      font-size: 1.3vw;
      font-weight: 400;
      margin: auto 0;
    }
  }

  .right {
    display: flex;
    height: 100%;
    padding-right: 2vw;
    user-select: none;
    span {
      height: 7.5vh;
      line-height: 7.5vh;
      margin: auto 0;
      font-family: PingFang SC;
      font-size: 1vw;
      font-weight: 400;
      color: #fff;
    }
  }
}</style>