<template>
  <div class="step1">
    <div class="left card">
      <div class="title">个人申请函模板</div>
      <div class="img">
        <img src="../../../assets/people3.png" alt="">
        <span>个人入驻</span>
      </div>
      <div class="text">
        <span>1. 自然人有效身份证复印件（身份证的正、反面复印在同一张A4纸上）有入驻申请人亲笔签名，纳指纹印，并彩色扫描</span>
        <span>2. 个人专业资格证明，获奖证书、荣誉证书等资料彩色扫描件</span>
        <span>3. 入驻申请函 </span>
      </div>
      <div class="btn">
        <el-button type="success">去入驻</el-button>
      </div>
    </div>
    <div class="right card">
      <div class="title">机构申请函模板</div>
      <div class="img">
        <img src="../../../assets/houses.png" alt="">
        <span>机构入驻</span>
      </div>
      <div class="text">
        <span>1. 《营业执照》或其它有效资质身份证明加盖公章，并彩色扫描</span>
        <span>2. 法定代表人/主要负责人的有效身份证复印件（身份证的正、反面复印在同一张A4纸上）加盖入驻申请人公章，并有法定代表人/主要负责人亲笔签名</span>
        <span>3. 申请认证公函</span>
      </div>
      <div class="btn">
        <el-button type="success">去入驻</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.step1 {
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  .left {
    width: 22%;
    height: 90%;
  }

  .right {
    width: 22%;
    height: 90%;
  }

  .card {
    border-radius: 0.5vw;
    background-color: #fff;
    padding: 4vh 2vw;
    display: flex;
    flex-direction: column;
    user-select: none;
    .title {
      text-align: right;
      color: #95D600;
      font-size: 1vw;
      font-family: PingFang SC;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }

    .img {
      display: flex;
      flex-direction: column;

      img {
        width: 3vw;
        height: 3.5vw;
        margin: 1.5vh auto 0 auto;
      }

      span {
        font-family: PingFang SC;
        font-size: 1.4vw;
        font-weight: 600;
        margin: 3vh auto;
      }
    }

    .text{
      color: rgb(89,89,89);
      font-family: PingFang SC;
      font-size: 1.1vw;
      line-height: 3vh;
      display: flex;
      flex-direction: column;
      span{
        margin: 0.5vh 0;
      }
    }
    .btn{
      display: flex;
      justify-content: center;
      margin: auto auto 1vh auto;
    }
  }
}</style>