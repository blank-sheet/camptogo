<template>
  <div class="step5">
    <div class="contain">
      <div class="title">已向您方对公账户打款，请联系财务查看填写金额，同时上传授权书完成认证</div>
      <div class="cards">
        <div class="left card">
          <div class="c-title">
            <div>上传授权书</div><span>查看授权书示例</span>
          </div>
          <div class="step">步骤一：下载授权书，确认授权书内容</div>
          <el-button class="dashd">下载授权书模板</el-button>
          <div class="step">步骤二：用下载的授权书模板打印后加盖实体公章上传</div>
          <el-button class="dashd">点击上传授权书</el-button>
          <div class="title">仅支持jpg、jpeg、png、pdf格式，大小限制10M</div>
        </div>
        <div class="right card">
          <div class="c-title">
            <div>确认对公账户</div><span>查看授权书示例</span>
          </div>
          <div class="step">机构名称</div>
          <div class="text">北京金益邦科技有限公司</div>
          <div class="step">企业对公账户</div>
          <div class="text">15489465489494</div>
          <div class="step">开户行名名称</div>
          <div class="text">招商银行</div>
          <div class="step">回填打款金额 (0.01~0.99)</div>
          <el-input class="input"></el-input>元
          <div class="title">最晚于有效期（2023-10-18 18；21）前回填金额</div>
        </div>
      </div>
    </div>
    <div class="btn">
      <el-button @click="handlerTostep4()">上一步</el-button>
      <el-button type="success" @click="handlerTostep6()">完成</el-button>
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
  height: 85vh;

  .contain {
    width: 80%;
    margin: 0 auto;
    padding: 4vh 1vw;

    .title {
      margin: 2vh 0 4vh 0;
      color: #8C8C8C;
      font-family: PingFang SC;
      font-size: 0.9vw;
    }

    .cards {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .card {
        width: 43%;
        height: 50vh;
        background-color: #FAFBFD;
        border: 1px dashed #BFBFBF;
        border-radius: 5px;
        padding: 1vw;
        user-select: none;
        font-size: 14px;
        .c-title {
          width: calc(100% - 2vw);
          display: flex;
          font-family: PingFang SC;
          justify-content: space-between;

          div {
            color: #262626;
            font-size: 1.2vw;
          }

          span {
            color: #93D600;
            cursor: pointer;
            font-size: 1vw;
            line-height: 2vw;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .step{
          font-family: PingFang SC;
          color: #262626;
          font-size:17px;
          line-height: 2vw;
          margin: 1vh 0;
        }
        .text{
          color: #595959;
          font-family: PingFang SC;
          font-size: 15px;
        }
        .input{
          width: 25%;
          margin: 0 1vw 0 0;
        }
        
      }
    }

  }

  .btn {
    display: flex;
    justify-content: center;
    margin: auto 0 5vh 0;
  }
}


.dashd{
  border:2px dashed #BFBFBF;
  background-color: #FAFBFD;
  margin-bottom: 3vh;
}
</style>