<template>
  <!-- 头部 -->
  <header>
    <div class="headerimg">
      <div class="greencloud"></div>
      <div class="logo"></div>
      <div class="text"><span class="t-text">|&emsp;招商平台</span><span class="t-text"
          @click="() => router.push('./')">返回官网</span></div>
      <div class="logo2"></div>
    </div>
  </header>

  <!-- 第一部分 -->
  <section class="section1" v-view="'fade-in'">
    <div class="left">
      <h1 class="pageTitle"><span>营地奇遇</span>&emsp13;&emsp13;<span>探手可得</span></h1>
      <h2>聚集优质行业伙伴, 让更多教育需求被满足</h2>
      <div class="buttons">
        <el-button class="btn" type="success" @click="openServerWechatVisiable = true">立即0元入驻</el-button>
        <el-dialog v-model="openServerWechatVisiable" title="立即入驻" width="30%">
          <p>请用手机扫码联系客服立即入驻</p>
          <img src="../../../assets/serverwechat.png" alt="" />
        </el-dialog>
        <el-button class="btn" @click="() => router.push('./login')">登录工作台</el-button>
      </div>
    </div>
    <div class="mask"></div>
    <div class="cloud1"></div>
    <div class="cloud2"></div>
    <div class="cloud3"></div>
    <div class="cloud4"></div>
    <div class="cloud5"></div>
    <div class="bigCloud"></div>
    <div class="spaceShip"></div>
    <div class="person"></div>
    <div class="fog"></div>
    <div class="balls"></div>
    <div class="footer">
      <div class="item" v-for="item in iconItems" :key="item.title">
        <el-image :src="item.url"></el-image>
        <div class="text">
          <div class="t-text1">{{ item.title }}</div>
          <div class="t-text2">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 第二部分 -->
  <section class="section2" v-view="'fade-in'">
    <div class="titleBox">
      <div class="left">
        <img src="../../../assets/zhangpeng.png" alt="">
      </div>
      <div class="right">
        <div class="r-title">帮助商家展示专业品牌、拓宽获客半径</div>
        <div class="r-text">搭建一个产品优质、丰富、盈利能力更强的在线市场</div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <img src="../../../assets/people2.png" alt="">
        <div>亲子营</div>
      </div>
      <div class="card">
        <img src="../../../assets/zhangpeng2.png" alt="">
        <div>独立营</div>
      </div>
      <div class="card">
        <img src="../../../assets/zhangpeng3.png" alt="">
        <div>冬夏令营</div>
      </div>
      <div class="card">
        <img src="../../../assets/mao.png" alt="">
        <div>游学</div>
      </div>
      <div class="card">
        <img src="../../../assets/boat.png" alt="">
        <div>研学</div>
      </div>
      <div class="card">
        <img style="transform: scale(1.7);" src="../../../assets/moneyHand.png" alt="">
        <div>社会实践</div>
      </div>
    </div>
    <div class="btn">
      <el-button type="success" @click="openServerWechatVisiable = true">立即0元入驻</el-button>
    </div>
  </section>

  <!-- 第三部分 -->
  <section class="section3" v-view="'fade-in'">
    <div class="title">营探优势</div>
    <div class="itemsBox">
      <div class="items">
        <div class="item">
          <div class="text">
            <div class="t-title">0元快速入驻</div>
            <div class="t-text">0费用入驻，1日在线审核，标准化入驻流程、专业化在线市场，有效提高入驻效率及品牌形象。</div>
            <div class="imgs">
              <img class="img1" src="../../../assets/zhong.png" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <div class="t-title">专业市场信用累积</div>
            <div class="t-text">帮助您在互信的商业基础上建立品牌资产，提供可长期持续发展的信用体系建设。</div>
            <div class="imgs">
              <img class="img1" src="../../../assets/kuai.png" style="width:3vw;height:3vw;margin: auto 1.5vh 1.5vh auto;"
                alt="">
              <img class="img2" src="../../../assets/lines.png" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <div class="t-title">行业定制保险在线投保</div>
            <div class="t-text">营探与保险公司、保险经纪公司定制在线投保方案, 保障平台及商户安全, 保护组织者、消费者权益。</div>
            <div class="imgs">
              <img class="img1" src="../../../assets/dun.png" alt="">
              <img class="img2" style="width:2vw;height:5vh;right:1vw;bottom:2vh" src="../../../assets/dun2.png" alt="">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <div class="t-title">标准化商品发布体系</div>
            <div class="t-text">广泛适用于体验式教育的商品发布体系，适用商品种类多，提升商品发布效率，提高信息流转速度及质量。</div>
            <div class="imgs">
              <img class="img1" src="../../../assets/moneyPack.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 第四部分 -->
  <section class="section4" v-view="'fade-in'">
    <div class="title">
      <div class="t-title">入驻商户每期享最高<span>300元</span>保险补贴!</div>
      <div class="t-text">营探补贴2元/人/日保险费用*</div>
    </div>
    <div class="items">
      <div class="item">
        <div class="i-title">零元入驻</div>
        <div class="i-text">一站管理 理想减负 专业提升</div>
        <div class="textBox">
          <div class="tb-text">0元申请费</div>
          <div class="tb-text">0元会员费</div>
          <div class="tb-text">0元认证费</div>
        </div>
        <img src="../../../assets/rocket2.png" alt="" style="width:40%;" class="bgimg">
      </div>

      <div class="item">
        <div class="i-title">先进创新</div>
        <div class="i-text">行业团体服务标准牵头制定单位</div>
        <div class="textBox">
          <div class="tb-text">高质量发展</div>
          <div class="tb-text">数字化平台</div>
          <div class="tb-text">专业化市场</div>
        </div>

        <img src="../../../assets/plant2.png" style="height: 28%;" alt="" class="bgimg">
      </div>
      <div class="item">
        <div class="i-title">超值权益</div>
        <div class="i-text">资源库跨界合作 转型升级辅导</div>
        <div class="textBox">
          <div class="tb-text">商户独立终端</div>
          <div class="tb-text">行业前沿资讯</div>
          <div class="tb-text">品牌营销服务</div>
        </div>
        <img src="../../../assets/starts.png" alt="" class="bgimg">
      </div>
    </div>
    <div class="footerPanl"></div>
  </section>

  <!-- 第五部分 -->
  <section class="section5" v-view="'fade-in'">
    <div class="computer"></div>
    <div class="ques">
      <div class="q-title">入驻条件</div>
      <div class="btns">
        <el-button class="btn" type="success" @click="openServerWechatVisiable = true">立即入驻</el-button>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <img src="../../../assets/card1.png" alt="" class="cardIcon">
        <div class="container">
          <div class="c-title">承诺合法经营</div>
          <div class="c-text">遵守营探平台规则，承诺合法合规经营并落实安全管理责任，以提供高品质服务、保护消费者权益及未成年人发展为己任。</div>
        </div>
      </div>
      <div class="card">
        <img src="../../../assets/card2.png" alt="" class="cardIcon">
        <div class="container">
          <div class="c-title">承诺最低价格</div>
          <div class="c-text">确保消费者在营探购买商品的零售价格，不高于该商品同期其他渠道的零售价格，承诺向营探用户提供最优优惠。</div>
        </div>
      </div>
      <div class="card">
        <img src="../../../assets/card3.png" alt="" class="cardIcon">
        <div class="container">
          <div class="c-title">承诺100%投保</div>
          <div class="c-text">打造可持续的经营发展条件，为自身、工作人员及活动出行人全面购买责任险及意外险的保险保障。</div>
        </div>
      </div>
      <div class="card">
        <img src="../../../assets/card4.png" alt="" class="cardIcon">
        <div class="container">
          <div class="c-title">承诺高质量发展</div>
          <div class="c-text">响应行业规范发展要求，积极培训并提高人员队伍素质，持续向产品研发投入资源，打造优势品牌。</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section6" v-view="'fade-in'">
    <div class="map"></div>
    <div class="line2"></div>
    <div class="setps"></div>
    <div class="btns">
      <el-button class="btn" type="success" @click="openServerWechatVisiable = true">立即入驻</el-button>
    </div>
  </section>

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
import { onMounted, reactive, ref } from 'vue'
import { request } from '../../../api'
import jiangbenImg from "../../../assets/jiangben.png"
import bixianImg from "../../../assets/bixian.png"
import zengyiImg from "../../../assets/zengyi.png"
import tixiaoImg from "../../../assets/tixiao.png"



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

onMounted(() => {
  const a = document.querySelector('.section1')
  a.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

const iconItems = [
  {
    title: '降本',
    desc: '免费入驻、免费咨讯及培训服务',
    url: jiangbenImg
  },
  {
    title: '增益',
    desc: '定向推广，增加产品及品牌曝光',
    url: zengyiImg
  },
  {
    title: '避险',
    desc: '定制保险，更全面保障组织者权益',
    url: bixianImg
  },
  {
    title: '提效',
    desc: '标准化产品发布，专业化行业工具',
    url: tixiaoImg
  }
]
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
  display: flex;
  user-select: none;

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
    width: 250px;
    height: 40px;
    background-image: url(../../../assets/white-yintan.png);
    background-position: center;
    background-size: 80%;
    background-repeat: no-repeat;
    position: absolute;
    top: 42px;
    left: 1%;
    transform: translate(0, -50%);
    z-index: 2;
  }

  .logo2 {
    background-image: url(../../../assets/white-yintan.png);
    width: 400px;
    height: 40px;
    position: absolute;
    z-index: 2;
    left: 40%;
    background-size: 65%;
    background-repeat: no-repeat;
    transform: translate(0, 73%);

  }

  .text {
    position: absolute;
    width: 80%;
    z-index: 3;
    color: #fff;
    font-size: 18px;
    top: 30px;
    left: calc(250px + 1%);
    display: flex;
    justify-content: space-between;
    font-family: PingFang SC;
    font-weight: 100;

    .t-text {
      cursor: pointer;
    }
  }

}


/* 第一部分样式 */
.section1 {
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(130deg, #E1EFB4 40%, #C2E86B);

  .left {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 50%;
    position: absolute;
    top: 25vh;
    left: 5vw;

    .pageTitle {
      display: flex;
      font-size: 4.4vw;
      margin-bottom: 4vh;
      justify-content: flex-start;
      align-items: center;
      color: #fff;
      font-family: youshe;
      font-weight: normal;
      text-shadow: 6px 0px 16px rgba(123, 175, 0, 0.15), 9px 0px 28px rgba(123, 175, 0, 0.17);
    }

    h2 {
      font-family: PingFang SC;
      font-size: 1.5vw;
      font-weight: 400;
      color: #75B000;
      margin: 0 0 0 0.5vw;
    }

    .buttons {
      margin-top: 8vh;

      .btn {
        margin: 0 3vw 0 0;
      }
    }

  }

  .right {
    float: right;
    padding-right: 140px;
    padding-top: 300px;
  }

  .mask {
    width: 100%;
    height: 280px;
    z-index: 1;
    background-image: url(../../../assets/mask.png);
    background-size: 100%;
    position: absolute;
    bottom: 0;
  }

  .cloud1 {
    width: 5.5vw;
    height: 8vh;
    background-image: url(../../../assets/cloud.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    top: 20%;
    left: 20%;
    z-index: 4;
  }

  .cloud2 {
    width: 8vw;
    height: 12vh;
    background-image: url(../../../assets/cloud.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    top: 20%;
    left: 47%;
    z-index: 4;
  }

  .cloud3 {
    width: 10.5vw;
    height: 23vh;
    background-image: url(../../../assets/cloud3.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    bottom: 5%;
    left: 39%;
    z-index: 4;
  }

  .cloud4 {
    width: 12vw;
    height: 23vh;
    background-image: url(../../../assets/cloud4.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    bottom: 3%;
    left: 79%;
    z-index: 4;
  }

  .cloud5 {
    width: 5.5vw;
    height: 8vh;
    background-image: url(../../../assets/cloud.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    top: 47%;
    right: 10%;
    z-index: 4;
  }

  .bigCloud {
    width: 14.5vw;
    height: 20vh;
    background-image: url(../../../assets/cloud2.png);
    background-repeat: no-repeat;
    position: absolute;
    background-size: 100%;
    right: 25.5%;
    bottom: 45%;
    z-index: 4;
  }

  .person {
    width: 17vw;
    height: 80vh;
    background-image: url(../../../assets/person.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 30.5%;
    bottom: 3%;
    z-index: 5;
  }

  .fog {
    width: 11vw;
    height: 40vh;
    background-image: url(../../../assets/fog.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 20%;
    bottom: 12%;
    z-index: 4;
  }

  .balls {
    width: 45vw;
    height: 20vh;
    background-image: url(../../../assets/balls.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 12%;
    bottom: 25%;
    z-index: 4;
  }

  .spaceShip {
    width: 16vw;
    height: 40vh;
    background-image: url(../../../assets/spaceShip.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 32%;
    right: 40%;
    z-index: 4;
  }

  .footer {
    width: 100%;
    height: 13vh;
    background-color: rgba(236, 240, 177, 0.5);
    position: absolute;
    bottom: 0;
    z-index: 2;
    border-top: 1px solid rgb(212, 224, 140);
    overflow: hidden;
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: space-evenly;
    user-select: none;

    .item {
      width: 20%;
      height: 100%;
      display: flex;

      .el-image {
        width: 3.5vw;
        height: 3.5vw;
        margin: auto 0;
      }

      .text {
        height: 3.5vw;
        margin: auto 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 0.5vw;

        .t-text1 {
          font-family: PingFang SC;
          font-size: 18px;
          font-weight: 600;
        }

        .t-text2 {
          font-family: PingFang SC;
          font-size: 14px;
          font-weight: 400;
          color: #595959;
        }
      }
    }
  }

}

.section2 {
  width: 100%;
  height: 120vh;
  position: relative;
  background-color: #fff;
  background-image: url(../../../assets/greenLinebg.png);
  background-size: 100%;
  background-repeat: no-repeat;

  .titleBox {
    display: flex;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    user-select: none;

    .left {
      img {
        width: 3.5vw;
        height: 3.5vw;
        margin: auto 20px auto 0;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      padding-top: 1vh;
      height: 15vh;

      .r-title {
        font-family: PingFang SC;
        font-size: 2.5vw;
        font-weight: 550;
        color: #333333;
      }

      .r-text {
        font-family: PingFang SC;
        font-size: 1.4vw;
        font-weight: 400;
        margin: 2vh 0;
        color: #333333;
      }
    }
  }

  .cards {
    width: 80%;
    height: 22%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    top: 45%;
    left: 50%;
    transform: translate(-50%);

    .card {
      height: 100%;
      width: 12%;
      background-color: #fff;
      border-radius: 1.3vw;
      border: 2px solid #75B000;
      box-shadow: 6px 0px 8px rgb(210, 230, 161);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      user-select: none;

      img {
        width: 4vw;
        height: 4vw;
        margin: auto auto 0 auto;
      }

      div {
        font-family: PingFang SC;
        font-size: 18px;
        margin: 2vh auto auto auto;
        color: #262626;
      }
    }
  }

  .btn {
    display: flex;
    width: 100vw;
    justify-content: center;
    position: absolute;
    top: 78%;
  }
}

.section3 {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #fff;
  background-image: url(../../../assets/greenLinebg2.png);
  background-size: 100%;
  background-repeat: no-repeat;

  .title {
    width: 100%;
    text-align: center;
    font-family: PingFang SC;
    font-size: 2.4vw;
    font-weight: 550;
    color: #333333;
    position: absolute;
    top: 20%;
  }

  .itemsBox {
    width: 100%;
    height: 55vh;
    position: absolute;
    top: 37%;
    display: flex;

    .items {
      width: 74%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .item {
        width: 40%;
        height: 23vh;
        border: 2px solid #75B000;
        border-radius: 1.3vw;
        box-shadow: 3px 6px 16px rgba(0, 0, 0, 0.03),
          0px -10px 32px rgba(0, 0, 0, 0.05);
        background-color: #fff;
        overflow: hidden;

        .text {
          padding: 2vh;
          color: #333333;
          user-select: none;
          position: relative;

          .t-title {
            font-family: PingFang SC;
            font-size: 1.4vw;
            font-weight: 550;
            margin: 2vh 0;
            color: #333333;
          }

          .t-text {
            width: 85%;
            font-family: PingFang SC;
            font-size: 1vw;
            font-weight: 400;
            margin: 2vh 0;
            color: #333333;
            height: 12vh;
            overflow: hidden;
          }

          .imgs {
            position: absolute;
            bottom: 2vh;
            right: 0;
            width: 5.5vw;
            height: 5.5vw;
            background-image: url(../../../assets/roundbg.png);
            background-size: 100%;
            background-repeat: no-repeat;
            display: flex;

            .img1 {
              width: 4vw;
              height: 4vw;
              margin: auto 0 0.5vh auto;
            }

            .img2 {
              width: 1.2vw;
              height: 1.2vw;
              position: absolute;
              right: 1.6vw;
              bottom: 3.5vh;
            }
          }
        }
      }
    }
  }
}

.section4 {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #EFF6EA;

  .footerPanl {
    width: 100%;
    height: 33vh;
    background-image: url(../../../assets/footerPanl.png);
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
  }

  .title {
    width: 100%;
    position: absolute;
    top: 15%;

    .t-title {
      width: 100%;
      text-align: center;
      font-family: PingFang SC;
      font-size: 2.4vw;
      font-weight: 550;
      color: #333333;

      span {
        text-decoration: underline;
        text-decoration-thickness: 1vh;
        text-decoration-color: rgb(250, 219, 23);
      }
    }

    .t-text {
      width: 100%;
      font-family: PingFang SC;
      font-size: 1.5vw;
      font-weight: 400;
      text-align: center;
      margin-top: 2vh;

    }
  }

  .items {
    width: 80%;
    margin: 0 10%;
    height: 45vh;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 38%;
    z-index: 5;

    .item {
      width: 18%;
      height: 100%;
      background-color: #fff;
      border: 2px solid #75B000;
      border-radius: 1.3vw;
      position: relative;
      user-select: none;

      .i-title {
        font-size: 1.5vw;
        width: 100%;
        color: #75B000;
        font-weight: 550;
        text-align: center;
        font-family: PingFang SC;
        margin-top: 5vh;
      }

      .i-text {
        font-size: 0.9vw;
        text-align: center;
        color: #262626;
        margin: 2vh 0 4vh 0;
        font-family: PingFang SC;
      }

      .textBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 20vh;
        width: 100%;

        .tb-text {
          margin: auto;
          font-family: PingFang SC;
          font-size: 1.1vw;
          color: #262626;
        }
      }

      .bgimg {
        width: 50%;
        height: 35%;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}

.section5 {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(198, 230, 115, 0.3), rgba(225, 239, 180, 0));
  position: relative;

  .computer {
    width: 30%;
    height: 75%;
    background-image: url(../../../assets/computer.png);
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 0;
    left: 5%;
  }

  .ques {
    width: 20%;
    height: 30vh;
    position: absolute;
    top: 24%;
    left: 13%;
    user-select: none;

    .q-title {
      font-size: 2.4vw;
      font-weight: normal;
      font-family: PingFang SC;
      color: #333333;
      font-weight: 550;
    }

    .btns {
      .btn {
        margin: 5vh 0;
      }
    }
  }

  .cards {
    width: 55%;
    height: 60vh;
    position: absolute;
    right: 5%;
    bottom: 10%;
    display: flex;
    flex-wrap: wrap;

    .card {
      width: 44%;
      height: 43%;
      margin: auto;
      border-radius: 1vw;
      background-color: #fff;
      border: 2px solid #75B000;
      box-shadow: 6px 0px 16px -8px rgba(117, 176, 0, 0.08), 9px 0px 28px 0px rgba(117, 176, 0, 0.05), 12px 0px 48px 16px rgba(117, 176, 0, 0.03);
      display: flex;

      .cardIcon {
        width: 5vw;
        height: 5vw;
        margin: 2vh 0;
      }

      .container {
        display: flex;
        flex-direction: column;
        margin: 1vh 1vw;
        padding: 2vh 0;

        .c-title {
          font-family: PingFang SC;
          font-size: 1.8vw;
          font-weight: 500;
          color: #333333;
        }

        .c-text {
          margin-top: 2vh;
          color: #666;
          font-family: PingFang SC;
          font-size: 1vw;
          font-weight: 400;
          line-height: 1.3vw;
        }
      }
    }
  }
}


.section6 {
  width: 100%;
  height: 100vh;
  background: #fff;
  position: relative;

  .map {
    width: 95%;
    height: 90%;
    background-image: url(../../../assets/map.png);
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 1vh;
  }

  .setps {
    width: 70%;
    height: 70%;
    background-image: url(../../../assets/steps.png);
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 2;
    position: absolute;
    bottom: 6%;
    left: 50%;
    transform: translate(-50%);
  }

  .line2 {
    width: 70%;
    height: 40%;
    background-image: url(../../../assets/line2.png);
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 3;
    position: absolute;
    left: 9%;
    top: 8%;
  }

  .btns{
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 5%;
    z-index: 5;
  }
}
</style>
