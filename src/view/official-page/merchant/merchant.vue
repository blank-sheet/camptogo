<template>
  <!-- 头部 -->
  <header>
    <div class="headerimg" @click="() => router.push('./')">
      <div class="greencloud"></div>
      <div class="logo"></div>
      <span>|</span>
      <span>招商平台</span>
    </div>
  </header>
  <!-- 第一部分 -->
  <section class="section1" v-view="'fade-in'">
    <div class="left">
      <div>
        <h1 class="pageTitle"><span>营地奇遇</span><span>探手可得</span></h1>
        <h2>欢迎加入营探平台<span>共创泛营地教育新生态</span></h2>
      </div>
      <div class="buttons">
        <!-- <el-button
          class="gotInvestplatform"
          type="success"
          @click="() => router.push('./settle-in')"
          >立即入驻</el-button
        > -->
        <el-button class="gotInvestplatform" type="success" @click="openServerWechatVisiable = true">立即入驻</el-button>
        <el-dialog v-model="openServerWechatVisiable" title="立即入驻" width="30%">
          <p>请用手机扫码联系客服立即入驻</p>
          <img src="../../../assets/serverwechat.png" alt="" />
        </el-dialog>
        <el-button @click="() => router.push('./login')" class="gotoworkbench">登录工作台</el-button>
      </div>
    </div>
    <div class="right">
      <div class="download">
        <div class="iphone_download">
          <img src="../../../assets/iphone.png" />
          <p>iPhone/iPad下载></p>
        </div>

        <div class="wechat_download">
          <img src="../../../assets/wechat.png" />
          <p>Wechat小程序></p>
        </div>
      </div>
    </div>
  </section>
  <!-- 第二部分 -->
  <section class="section2" v-view="'fade-in'">
    <div class="advantage">
      <img src="../../../assets/quotation.png" alt="" />
      <h1>我们的<span style="color: #93d500">优势</span></h1>
      <div>
        <div>垂直市场全球视野</div>
        <div></div>
        更优质的服务 更专业的工具 更广泛的获客
      </div>
    </div>
    <div class="buttons">
      <!-- <el-button
        class="gotInvestplatform"
        type="success"
        @click="() => router.push('./settle-in')"
        >立即入驻</el-button
      > -->
      <el-button class="gotInvestplatform" type="success" @click="openServerWechatVisiable = true">立即入驻</el-button>
      <el-button @click="() => router.push('./login')" class="gotoworkbench">登录工作台</el-button>
    </div>
    <div class="fourgoods">
      <div class="fourboxs">
        <img src="../../../assets/fourimg_1.png" alt="1" />
        <div>快速认证 提示商家权重</div>
        <div><span>营探核心商家助力池等你jump in</span></div>
      </div>
      <div class="fourboxs">
        <img src="../../../assets/fourimg_2.png" alt="1" />
        <div>新商户 丰富见面礼</div>
        <div><span>经营攻略免费学 | 安全守护 | 咨询分享</span></div>
      </div>
      <div class="fourboxs">
        <img src="../../../assets/fourimg_3.png" alt="1" />
        <div>流量扶持 多维立体展示</div>
        <div><span>主页流量扶持 | 私域流量扶持 | 品牌联合推广</span></div>
      </div>
      <div class="fourboxs">
        <img src="../../../assets/fourimg_4.png" alt="1" />
        <div>数字化工作台 运营新革命</div>
        <div><span>一站式促销管理 | 学员信息管理 | 资金管理</span></div>
      </div>
    </div>
  </section>
  <!-- 第三部分 -->
  <section class="section3" v-view="'fade-in'">
    <div class="left">
      <img src="../../../assets/computer.png" alt="11" />
      <div>1分钟填写入驻申请</div>
    </div>
    <div class="right">
      <h1><span>营探</span>科技驱动型平台</h1>
      <h2>聚焦泛营地市场</h2>
      <div>
        <p>
          定制工具 丨 花样跨界 丨 价值认同<br />
          用科技、智慧、文化的力量，践行报国
        </p>
      </div>
      <div class="Settled">
        <el-button type="success" @click="openServerWechatVisiable = true">机构入驻</el-button>
        <el-button type="success" @click="openServerWechatVisiable = true">个人入驻</el-button>
      </div>
    </div>
  </section>
  <!-- 第四部分 -->
  <section class="section4" v-view="'fade-in'"></section>
  <!-- 第五部分 -->
  <!-- <section class="section5" v-view="'fade-in'">
    <h1>欢迎入驻营探</h1>
    <div>
      <el-form :model="form" label-width="140px" status-icon>
        <el-form-item label="申请人全称：" required="true"
          ><el-input
            style="width: 300px"
            type="text"
            placeholder="与营业执照/身份证名称保持一致"
            v-model="form.applicant_name"
        /></el-form-item>
        <el-form-item label="注 册 邮 箱：" required="true"
          ><el-input
            style="width: 300px"
            type="text"
            placeholder="请填写正确的邮箱住址"
            v-model="form.email"
        /></el-form-item>
        <el-form-item label="注册手机号：" required="true"
          ><el-input
            style="width: 300px"
            type="text"
            placeholder="可通过该手机号找回密码"
            v-model="form.phoneplatform"
        /></el-form-item>
        <el-form-item label="联系人姓名：" required="true"
          ><el-input
            style="width: 300px"
            type="text"
            placeholder="请填写联系人姓名"
            v-model="form.contact_name"
        /></el-form-item>
        <el-form-item label="联系人职务：" required="true"
          ><el-input
            style="width: 300px"
            type="text"
            placeholder="请填写联系人职务"
            v-model="form.contact_job"
        /></el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit"
            >申请入驻</el-button
          ></el-form-item
        >
      </el-form>
    </div>
  </section> -->
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { request } from '../../../api'
const router = useRouter()
const openServerWechatVisiable = ref(false)
const form = reactive({
  email: '',
  applicant_name: '',
  contact_job: '',
  contact_name: '',
  phoneplatform: '',
  phoneplatform: ''
})
const submit = () => {
  request
    .post('/api/e9b849a515a84327b424af7ccdbf2949/mobile/common/v1_0_0/coop/collect', {
      content: {
        ...form,
        platform: 'web'
      },
      version: '1.0.0'
    })
    .then(r => {
      if (r.Code == 200) ElMessage('申请成功')
    })
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'youshe';
  src: url('../../../assets/font/Youshe.ttf');
}

@font-face {
  font-family: 'Nunito';
  src: url('../../../assets/font/Nunito-Black.ttf');
}

/* 头部样式 */
.headerimg {
  height: 118px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 150px;
  z-index: 9999;

  .greencloud {
    top: 0;
    width: 100%;
    height: 118px;
    background-image: url(../../../assets/banner.png);
    background-position: center 120px;
    background-size: cover;
    position: absolute;
    z-index: 1;
  }

  .logo {
    width: 288px;
    height: 40px;
    background-image: url(../../../assets/white-yintan.png);
    background-position: center;
    background-size: 85%;
    background-repeat: no-repeat;
    position: absolute;
    top: 42px;
    left: 50%;
    transform: translate(-235%, -50%);
    z-index: 2;
  }

  span {
    position: absolute;
    z-index: 3;
    margin-left: 32px;
    color: #fff;
    font-size: 20px;
    top: 30px;
    left: 21%;
    font-weight: 100;
  }

  :nth-child(4) {
    padding-left: 32px;
    font-weight: 400;
  }
}

/* 下载按钮样式 */
.download {
  padding-top: 30px;
  width: 1200;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
    margin-right: 4px;
    margin-left: 5px;
  }

  .iphone_download {
    width: 145px;
    height: 48px;
    background-color: #999;
    color: white;
    margin: 20px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    // cursor: pointer;
    // &:hover::before {
    //   content: "敬请期待";
    //   width: 100px;
    //   position: absolute;
    //   top: -50%;
    //   transform: translate(23%, 20%);
    //   font-size: 14px;
    //   color: #333;
    // }
    // &:hover {
    //   transform: scale(0.9);
    //   transition: transform 0.3s ease-in-out;
    // }
  }

  .wechat_download {
    width: 145px;
    height: 48px;
    background-color: #333;
    color: white;
    margin: 20px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    position: relative;

    &:hover::before {
      content: '';
      width: 120px;
      height: 120px;
      position: absolute;
      top: -140%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url('../../../assets/wechatP.jpg');
      background-size: cover;
      z-index: 999;
      opacity: 0;
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover {
      transform: scale(0.9);
      transition: transform 0.3s ease-in-out;
    }
  }
}

.buttons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 25px;

  .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 206px;
      height: 206px;

      margin-left: 50%;
      transform: translate(-50%, 0);
    }

    p {
      height: 24px;
      width: 224px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 89px;
      font-size: 16px;
      color: #000000d9;
      margin-bottom: 24px;
      margin-left: 50%;
      transform: translate(-50%, 0);
    }
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .gotoworkbench {
    font-size: 16px;
    margin: 20px;
    width: 121px;
    height: 38.5px;
    border-radius: 8px;
    border: solid 1px #bfbfbf;
    color: #bfbfbf;
  }

  .gotInvestplatform {
    font-size: 16px;
    margin: 20px;
    width: 121px;
    height: 38.5px;
    border-radius: 8px;
    background-color: #93d500;
  }
}

/* 第一部分样式 */
.section1 {
  width: 100%;
  height: 840px;
  position: relative;

  .left {
    float: left;

    .pageTitle {
      padding-top: 100px;
      display: flex;
      font-size: 60px;
      justify-content: flex-start;
      padding-top: 200px;
      padding-left: 200px;
      align-items: center;
      color: #fff;
      font-family: youshe;
      font-weight: normal;
      text-shadow: 0px 4px 4px rgba(147, 213, 0, 0.25);

      span {
        margin-left: 30px;
        margin-right: 30px;
      }
    }

    h2 {
      margin-top: 63px;
      padding-left: 235px;
      font-size: 30px;
      font-weight: 400;

      span {
        font-size: 20px;
        padding-left: 30px;
        color: #93d500;
      }
    }
  }

  .right {
    float: right;
    padding-right: 140px;
    padding-top: 300px;
  }

  .buttons {
    padding-left: 190px;
    padding-top: 100px;
  }
}

/* 第二部分样式 */
.section2 {
  height: 840px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .advantage {
    box-shadow: 1px 1px 10px rgba(144, 144, 144, 0.25);
    height: 200px;
    width: 800px;
    left: 6694px;
    top: -781px;
    background-color: #fff;
    border-radius: 11.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    img {
      width: 30px;
      position: absolute;
      padding-right: 720px;
      padding-bottom: 130px;
    }
  }

  .fourgoods {
    width: 1180px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      padding: 20px;
    }

    div {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      width: 260px;
      margin: 10px;

      span {
        font-size: 12px;
        color: #8a8a8a;
        padding-bottom: 45px;
      }
    }

    .fourboxs {
      box-shadow: 1px 1px 10px rgba(144, 144, 144, 0.25);
    }
  }
}

.section3 {
  height: 840px;

  .left {
    float: left;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    img {
      width: 450px;
      padding-left: 200px;
      padding-top: 160px;
    }

    div {
      position: absolute;
      top: 600px;
      left: 223px;
      color: #93d500;
    }
  }

  .right {
    float: right;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 150px;
    padding-top: 200px;
    padding-right: 180px;

    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 45px;

      span {
        padding-right: 30px;
        color: #93d500;
      }
    }

    h2 {
      font-size: 20px;
      font-weight: 400;
      color: #4d4d4d;
      position: relative;
      left: -142px;
      top: -5px;
      padding-bottom: 80px;
    }

    :nth-child(3) {
      position: relative;
      line-height: 40px;
      left: -75px;
      padding-bottom: 40px;
      color: #4d4d4d;
    }

    .Settled {
      :nth-child(1) {
        margin-right: 20px;
        margin-left: 20px;
      }
    }

    .el-button {
      margin-top: 52px;
      background-color: #93d500;
      border-radius: 6px;
      width: 100px;
      height: 40px;
      position: relative;
      left: -103px;
    }
  }
}

/* 第四部分样式 */
.section4 {
  height: 840px;
  background-image: url(../../../assets/mapallcontent.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

/* 第五部分样式 */
.section5 {
  height: 840px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    color: red;
  }

  .el-button {
    margin-top: 30px;
    background-color: #93d500;
    border-radius: 6px;
    width: 100px;
    height: 40px;
  }

  h1 {
    padding-bottom: 30px;
  }
}

/* 动画样式 */
@keyframes fade {
  0% {
    transform: translateY(100px);
    opacity: 0%;
  }

  100% {
    transform: translateY(0);
    opacity: 100%;
  }
}

.fade-in {

  h1,
  h2 {
    animation: fade 1s ease-in-out 1;
  }
}</style>
