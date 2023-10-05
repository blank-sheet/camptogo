<template>
  <div id="login">
    <div class="left">
      <div class="title">
        <p class="text-4xl">拥抱营探</p>
        <p style="margin-bottom: 20px">共创营地教育新生态</p>
        <p class="subtitle" style="margin-bottom: 50px">更多新活动、新权益等你来领取</p>
        <el-button @click="() => router.push('/settle-in')"> 0 元 入 驻</el-button>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <img class="logo" src="../../../assets/camptogoLogo.png" />
        <camp-login />
        <div class="risknotice">
          <div class="innerrisk">
            登录即视为您已同意
            <a href="#">《营探用户协议》</a>、<a href="#">《营探隐私政策》</a>、<a href="#">《风险知情书》</a>
          </div>
        </div>
      </div>
      <router-link to="/">
        <div class="backButton">返回官网</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CampLogin from '../../../component/camp-login.vue'
const router = useRouter()
</script>

<style scoped lang="scss">
.title {
  .el-button {
    color: var(--primary-color);
    width: 200px;
    height: 50px;
    font-size: large;
    margin: 0 auto;

    &:hover {
      background-color: #fff;
    }
  }
}

.risknotice {
  width: 200px;
  padding: 0 auto;
  margin-top: 30px;
  color: #bbb;
}

.innerrisk {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 530px;
}

.innerrisk a {
  color: #bbb;
}

.innerrisk a:hover {
  color: #93d500;
}

#login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

#login .left {
  position: relative;
  display: flex;
  /* position: relative; */
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: #c2e76b;

  overflow: hidden;
}

#login .left .title {
  display: flex;
  flex-direction: column;
  margin-top: 25%;
  margin-left: 40px;

  font-size: 32px;
  font-weight: 800;
  color: #fff;
}

#login .left .title .subtitle {
  display: flex;
  font-size: 18px;
  font-weight: 550;
  justify-content: flex-start;
}

#login .right {
  display: flex;
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

#login .content {
  width: 70%;
  height: 60%;
  background-color: var(--color-pure-white);
  /* box-shadow: var(--color-background-grey) 0 0 15px; */
  border-radius: 8px;
  margin-top: -6%;
  padding: 50px 60px;
}

#login .content p {
  margin-bottom: 0;
}

#login .content img.logo {
  width: 200px;
  margin-bottom: 50px;
}

#login .content .form {
  margin-top: 40px;
}

#login .content .form .form-item {
  position: relative;
}

#login .content .form .form-item:first-child {
  margin-bottom: 10px;
}

#login .content .form .form-item:nth-child(2) {
  margin-bottom: 40px;
}

#login .content .form .form-item p {
  font-size: 14px;
  color: var(--color-text-grey);
  margin-bottom: 8px;
  /* margin-left: 16px; */
}

#login .content .form .form-item input {
  border: none;
  outline: none;
  width: 100%;
  height: 35px;
  font-size: 22px;
  color: var(--color-weight-black);
  /* background-color: var(--color-background-grey); */
  border: #dddddd solid 1px;
  border-radius: 10px;
  padding: 5px 18px;

  font-family: siyuan;
  font-size: 21px;
  font-weight: lighter;
}

#login .content .form .form-item input#password {
  padding-right: 48px;
}

/* #login .content .form .buttonZone {
  text-align: right;
} */
#login .content .form .buttonZone button#loginBtn {
  /* width: 100%; */
  width: 140px;
  height: 40px;
  border: 1px solid var(--color-background-light-green);
  /* background-color: var(--color-background-button-green); */
  background-color: #93d500;
  color: var(--color-impure-white);
  font-family: 'siyuan';
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  transition: all 0.5s ease;
}

#login .content .form .buttonZone button#loginBtn:hover {
  transform: translateZ(0) scale(1.08);
  -webkit-transform: translateZ(0) scale(1.08);
  -moz-transform: translateZ(0) scale(1.08);
  -o-transform: translateZ(0) scale(1.08);
}

img.hidePassword,
img.showPassword {
  position: absolute;
  right: 10px;
  top: 30px;

  width: 34px;
  height: 34px;
}

.fixedFullLoading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(1, 1, 1, 0.3);

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
}

#login .backButton {
  position: absolute;
  right: 80px;
  top: 22px;
  font-size: 14px;
  color: grey;
  cursor: pointer;
}

.risknotice {
  font-size: 11px;
}

.frog {
  position: absolute;
  left: 20px;
  bottom: -20px;

  width: 200px;
}
</style>
