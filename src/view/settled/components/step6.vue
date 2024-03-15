<template>
  <div class="step5" v-if="route.params.type == 'personal'">
    <div class="contain">
      <div class="title">认证方式</div>
      <div class="box">
        <div class="card">
          <img src="../../../assets/face.png" alt="">
          <div>人脸识别</div>
        </div>
        <div class="card">
          <img src="../../../assets/phone.png" alt="">
          <div>手机认证</div>
        </div>
      </div>
      <div class="title">选择刷脸方式</div>
      <div class="box">
        <div class="card">
          <img class="img2" src="../../../assets/zfb.png" alt="">
          <div class="c-text">
            <div>支付宝</div>
            <span>需要唤起支付宝APP完成人脸识别</span>
          </div>
        </div>
        <div class="card">
          <img class="img2" src="../../../assets/fastFace.png" alt="">
          <div class="c-text">
            <div>快捷刷脸</div>
            <span>请根据提示进行人脸识别</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我已阅读并同意<span>《营探服务协议》</span><span>《营探隐私政策》</span><span>《数字证书服务协议》</span>并同意申请天津中环AC证书</div>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我同意营探采集人脸识别数据用于认证服务</div>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerTostep7()">同意并继续</el-button>
    </div>
    <div class="tip">
      <div>非中国大陆居民, <span>点击此处进行验证</span></div>
    </div>
  </div>
  <div class="step5" v-else>
    <div class="contain">
      <div class="title">认证方式</div>
      <div class="box">
        <div class="card">
          <img src="../../../assets/faren.png" alt="">
          <div>法定代表人认证</div>
        </div>
        <div class="card">
          <img src="../../../assets/duigon.png" alt="">
          <div>对公打款认证</div>
        </div>
      </div>
      <div class="bigcard">
        <div class="text1">当前认证组织: 北京金益邦科技有限公司</div>
        <div class="text2">请进行法人本人意愿确认，即可完成企业实名认证</div>
      </div>
      <div class="title">认证方式</div>
      <div class="box">
        <div class="card">
          <img src="../../../assets/face.png" alt="">
          <div class="c-text">
            <div>人脸认证</div>
            <span>请进行法人本人意愿确认,即可完成企业使命认证</span>
          </div>
        </div>
        <div class="card">
          <img src="../../../assets/phone.png" alt="">
          <div class="c-text">
            <div>手机号认证</div>
            <span>需法定代表人本人身份证办理手机号接收短信完成认证</span>
          </div>
        </div>
      </div>
      <div class="title">选择刷脸方式</div>
      <div class="box">
        <div class="card">
          <img class="img2" src="../../../assets/zfb.png" alt="">
          <div class="c-text">
            <div>支付宝</div>
            <span>需要唤起支付宝APP完成人脸识别</span>
          </div>
        </div>
        <div class="card">
          <img class="img2" src="../../../assets/fastFace.png" alt="">
          <div class="c-text">
            <div>快捷刷脸</div>
            <span>请根据提示进行人脸识别</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我已阅读并同意<span>《营探服务协议》</span><span>《营探隐私政策》</span><span>《数字证书服务协议》</span>并同意申请天津中环AC证书</div>
    </div>
    <div class="tips">
      <el-checkbox></el-checkbox>
      <div>我同意营探采集人脸识别数据用于认证服务</div>
    </div>
    <div class="btn">
      <el-button type="success" @click="handlerTostep7()">同意并继续</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const handlerTostep7 = () => {
  router.push(`/settled/step7/${route.params.type}`)
}

onMounted(() => {
})
const formRef = ref(null)
const select = ref(1)
</script>

<style lang="scss" scoped>
.step5 {
  width: 75%;
  background-color: #fff;
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  margin: 3vh 0;

  .contain {
    display: flex;
    flex-direction: column;
    padding: 2vh 1vw;
    display: flex;
    flex-direction: column;

    .title {
      width: 75%;
      margin: 0 auto;
      font-family: PingFang SC;
      font-size: 1vw;
      color: #595959;
    }

    .bigcard {
      margin: 1vh auto 4vh auto;
      width: calc(75% - 4vw);
      height: 13vh;
      display: flex;
      border: 1px solid rgb(217, 217, 217);
      border-radius: 10px;
      background-color: rgb(249,249,249);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2vw;
      color: #595959;
      font-family: PingFang SC;
      cursor: pointer;

      .text1{
        font-size: 1.2vw;
        line-height: 2vw;
      }
      .text2{
        font-size: 1vw;
        line-height: 2vw;
        opacity: 0.8;
      }
    }

    .box {
      width: 75%;
      margin: 2vh auto 4vh auto;
      height: 13vh;
      display: flex;
      justify-content: space-between;

      .card {
        width: 47%;
        height: 100%;
        display: flex;
        border: 1px solid rgb(217, 217, 217);
        border-radius: 10px;
        cursor: pointer;
        img {
          width: 2vw;
          height: 2vw;
          margin: auto 1vw auto 2vw;
        }

        .img2 {
          width: 5vw;
          height: 5vw;
          margin: auto 1vw auto 2vw;
        }

        .c-text {
          font-family: PingFang SC;
          color: #595959;
          display: flex;
          flex-direction: column;
          width: 80%;

          div {
            font-size: 1.3vw;
            line-height: 1.8vw;
          }

          span {
            font-size: 0.9vw;
            line-height: 1.2vw;
            width: 97%;
            opacity: 0.8;
          }
        }

        div {
          margin: auto auto auto 0;
          color: #595959;
          font-family: PingFang SC;
        }
      }
    }
  }

  .tips {
    width: 70%;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: left;
    user-select: none;

    div {
      font-size: 1vw;
      margin: auto 1vw;

      span {
        color: #93D600;
        font-family: PingFang SC;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .tip {
    width: 100%;
    text-align: center;
    margin: 3vh 0;

    div {
      font-size: 1vw;
      margin: auto 1vw;
      color: #8C8C8C;

      span {
        color: #93D600;
        font-family: PingFang SC;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 5vh 0;
  }
}


.el-button {
  border-style: dashed;
}</style>