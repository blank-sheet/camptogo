<template>
  <div class="settled">
    <settledHeader :title="'选择商家类型'"></settledHeader>
    <div class="kefu">
      <img src="../../assets/kefu.png" alt="">
      <div>联系我们</div>
    </div>
    <div class="contain">
      <router-view></router-view>
    </div>
    <div class="tips">
      <div>海外商家，<span>点击此处进行注册</span></div>
      <div>Overseas merchants, click here <span>to register</span></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import settledHeader from "./components/settledHeader.vue"

const steps = ref([])
</script>

<style lang="scss" scoped>
.settled {
  width: 100vw;
  min-height: 100vh;
  background: #F5F5F5;
  position: relative;
  .kefu {
    width: 4.5vw;
    height: 4.5vw;
    background-color: #fff;
    z-index: 4;
    position: sticky;
    left: 100%;
    top: 20vh;
    box-shadow: 0px -1px 2px -2px rgba(0, 0, 0, 0.16), 0px -3px 6px 0px rgba(0, 0, 0, 0.12), 0px -5px 12px 4px rgba(0, 0, 0, 0.09);
    display: flex;
    flex-direction: column;
    border-radius: 0.5vw;
    cursor: pointer;

    img {
      width: 1.8vw;
      height: 1.8vw;
      margin: auto auto 1vh auto;
    }

    div {
      margin: 0 auto auto auto;
      color: #75B000;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 0.8vw;
    }

    &:hover::before {
      content: "";
      width: 4.5vw;
      height: 4.5vw;
      position: absolute;
      left: -101%;
      background-color: #fff;
      background-image: url(../../assets/qrCode.jpg);
      background-size: cover;
      z-index: 999;
      border-radius: 0.5vw;
    }

    &:hover {
      transition: transform 0.3s ease-in-out;
    }
  }

  .tips {
    position: absolute;
    bottom: 5vh;
    left: 3vw;
    user-select: none;

    div {
      font-family: PingFang SC;
      font-size: 1.1vw;
      font-weight: 400;
      color: rgb(172, 172, 172);
      line-height: 4vh;
    }

    span {
      color: #95D600;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .contain{
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>