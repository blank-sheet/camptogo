<template>
  <div class="step9">
    <div class="card">
      <div class="title">
        <img src="../../../assets/pass.png" alt="">
        <span>入驻审核通过</span>
      </div>
      <div class="code">
        <img src="../../../assets/wxCode.png" alt="">
      </div>
      <div class="sao">
        <span>—</span> 微信扫一扫 <span>—</span>
      </div>
      <div class="text">
        关注营探, 等待签约完成
      </div>
    </div>
    <div class="card2">
      <div class="title">入驻协议和相关资料</div>
      <img class="plant" src="../../../assets/plant.png" />
      <div class="btns">
        <el-button class="btn">查看入驻协议和相关资料</el-button>
      </div>
    </div>
    <div class="card">
      <div class="code">
        <img src="../../../assets/wxCode.png" alt="">
      </div>
      <div class="sao">
        <span>—</span> 微信扫一扫 <span>—</span>
      </div>
      <div class="text">
        电子签二维码
      </div>
      <div class="btns">
        <el-button type="success" class="btn">复制链接</el-button>
        <el-button type="success" class="btn">查询签约结果</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.step9 {
  width: 80%;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .card {
    width: 25%;
    height: 55vh;
    margin: auto;
    background-color: #fff;
    font-family: PingFang SC;
    display: flex;
    flex-direction: column;
    border-radius: 6px;

    .title {
      display: flex;
      justify-content: center;
      margin: 3vh 0 1vh 0;

      img {
        width: 22px;
        height: 22px;
        margin: auto 8px;
      }

      span {
        font-size: 20px;
        text-align: left;
        margin: auto 0;
        color: #262626;
      }
    }

    .code {
      display: flex;
      justify-content: center;
      margin: 3vh 0 2vh 0;
    }

    .sao {
      text-align: center;
      font-size: 14px;
      color: #8C8C8C;
      span{
        font-weight: 550;
      }
    }

    .text {
      font-size: 20px;
      text-align: center;
      margin: 4vh 0;
    }

    .btns {
      margin: 0 0 auto 0;
      display: flex;
      justify-content: center;
    }

  }

  .card2 {
    width: 30%;
    height: 65vh;
    background-color: #93D600;
    position: relative;
    border-radius: 6px;
    .title {
      color: #fff;
      font-weight: 550;
      font-size: 22px;
      font-family: PingFang SC;
      text-align: center;
      margin: 5vh 0;
      opacity: 0.85;
      letter-spacing: 2px;
      
    }

    .plant {
      width: 60%;
      height: 75%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    .btns{
      display: flex;
      justify-content: center;
      z-index: 3;
      position: absolute;
      bottom: 5vh;
      width: 100%;
      .el-button{
        color: #93D600;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 550;
      }
    }
  }
}</style>