<template>
  <!-- 头部 -->
  <!-- <header>
    <div class="headerimg">
      <div class="greencloud"></div>
      <div class="text"><span class="t-text">招商平台</span><span class="t-text"
          @click="() => router.push('./')">返回首页</span></div>
      <div class="logo2"></div>
    </div>
  </header> -->
  <div class="header header-zhaoshang" ref="header">
    <div class="t-text text-left">招商平台</div>
    <div class="yingtan">
      <img class="yingtanimg" src="../../../assets/white-yintan.png" alt="" />
    </div>
    <div class="t-text text-right" @click="() => router.push('./')">返回首页</div>
    <div class="logo2"></div>
    <div class="header-upper">
      <div class="routerTest"></div>
    </div>
    <div class="header-lower"></div>
  </div>


  <div class="kefu">
    <img src="../../../assets/kefu.png" alt="">
    <div>联系我们</div>
  </div>
  <!-- 第一部分 -->
  <section class="section1" v-view="'fade-in'" id="section-1">
    <div class="left">
      <h1 class="pageTitle"><span>营地奇遇</span>&emsp13;&emsp13;<span>探手可得</span></h1>
      <h2>聚集优质行业伙伴, 让更多教育需求被满足</h2>
      <div class="buttons">
        <el-button class="btn" type="success" @click="handlerToSettled()" style="color: #fff;">立即入驻</el-button>
        <el-dialog v-model="openServerWechatVisiable" title="立即入驻" width="30%">
          <p>请用手机扫码联系客服立即入驻</p>
          <img src="../../../assets/serverwechat.png" alt="" />
        </el-dialog>
        <el-button class="btn btn2" style="border: 1px solid rgba(191, 191, 191, 1);" @click="() => router.push('./login')">登录工作台</el-button>
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
  <section class="section2" v-view="'fade-in'" id="section-2">
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
        <div>日间营</div>
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
        <div>课题竞赛</div>
      </div>
    </div>
    <!-- <div class="btn">
      <el-button type="success" @click="handlerToSettled()">立即0元入驻</el-button>
    </div> -->
  </section>

  <!-- 第三部分 -->
  <section class="section3" v-view="'fade-in'" id="section-3">
    <div class="title">营探优势</div>
    <div class="itemsBox">
      <div class="items items1">
        <div class="item">
          <div class="text">
            <div class="t-title">快速入驻</div>
            <div class="t-text">在线申请1日审核，标准化入驻流程，专业化在线市场，有效提高入驻效率及品牌形象。</div>
            <!-- <div class="imgs">
              <img class="img1" src="../../../assets/zhong.png" alt="">
            </div> -->
          </div>
          <div class="new-img">
            <img src="../../../assets/zhong3.png" alt="">
          </div>
        </div>
        <div class="item">
          <div class="text">
            <div class="t-title">专业市场</div>
            <div class="t-text">专业市场服务，以高效、专业的方式，为您的品牌推广、产品展示、营销获客提供全方位支持。</div>
            <!-- <div class="imgs">
              <img class="img1" src="../../../assets/kuai.png" style="width:3vw;height:3vw;margin: auto 1.5vh 1.5vh auto;"
                alt="">
              <img class="img2" src="../../../assets/lines.png" alt="">
            </div> -->
          </div>
          <div class="new-img">
            <img src="../../../assets/book3.png" alt="">
          </div>
        </div>
      </div>
      <div class="items items2">
        <div class="item">
          <div class="text">
            <div class="t-title">在线投保</div>
            <div class="t-text">专业团队定制在线投保方案，入驻可享投保补贴，全程保护商家和消费者权益。</div>
            <!-- <div class="imgs">
              <img class="img1" src="../../../assets/dun.png" alt="">
              <img class="img2" style="width:2vw;height:5vh;right:1vw;bottom:2vh" src="../../../assets/dun2.png" alt="">
            </div> -->
          </div>
          <div class="new-img">
            <img src="../../../assets/dun3.png" alt="">
          </div>
        </div>
        <div class="item">
          <div class="text">
            <div class="t-title">标准体系</div>
            <div class="t-text">标准化商品发布体系，适用商品种类多、范围广，提升发布效率，提高信息流转速度及质量。</div>
            <!-- <div class="imgs">
              <img class="img1" src="../../../assets/moneyPack.png" alt="">
            </div> -->
          </div>
          <div class="new-img">
            <img src="../../../assets/moneyPack3.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 第四部分 -->
  <section class="section4" v-view="'fade-in'" id="section-4">
    <div class="title">
      <div class="t-title">立即入驻享免费代运营！</div>
      <div class="t-text">同时可享2元/人/日平台保费补贴，最高300元/期*</div>
    </div>
    <div class="items">
      <div class="card-items">
        <div class="card-item">
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
          <div class="smallFooterPanl panl1"></div>
        </div>
        <div class="card-item">
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
          <div class="smallFooterPanl panl2"></div>
        </div>
        <div class="card-item">
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
          <div class="smallFooterPanl panl3"></div>
        </div>
      </div>
    </div>
    <!-- <div class="panl">
      <div class="smallFooterPanl panl1"></div>
      <div class="smallFooterPanl panl2"></div>
      <div class="smallFooterPanl panl3"></div>
    </div> -->
    <div class="footerPanl"></div>
    <div class="footer-text">*详见《<span>营探组织者责任险补贴政策（2024）</span>》</div>
    <!-- <div class="btns">
      <el-button class="btn" type="success" @click="handlerToSettled()">立即入驻</el-button>
    </div> -->
  </section>

  <!-- 第五部分 -->
  <section class="section5" v-view="'fade-in'" id="section-5">
    <div class="computer"></div>
    <div class="ques">
      <div class="q-title">入驻条件</div>
      <!-- <div class="btns">
        <el-button class="btn" type="success" @click="handlerToSettled()">立即入驻</el-button>
      </div> -->
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

  <!-- 第六部分 -->
  <section class="section6" v-view="'fade-in'" id="section-6">
    <div class="bigTitle">入驻流程</div>
    <div class="map"></div>
    <div class="line2"></div>
    <div class="setps">
      <div class="step step1">
        <el-button class="btn" type="success">入驻类型</el-button>
        <div class="s-contain">
          <div class="s-c-title">个人</div>
          <div class="s-c-text">1. 境内的完全民事行为能力人</div>
          <div class="s-c-text">2. 个人专业能力证明</div>
          <div class="s-c-text">3. 有较为丰富的活动举办经验</div>
          <div class="s-c-title" style="margin-top: 20px;">机构</div>
          <div class="s-c-text">1. 组织“体验式教育”活动的机构</div>
          <div class="s-c-text">2. 有效的经营许可证明(如有)</div>
          <div class="s-c-text">3. 商标注册证、经营授权(如有)等</div>
        </div>
      </div>
      <div class="step step2">
        <el-button class="btn" type="success">入驻申请</el-button>
        <div class="s-contain">
          <div class="s-c-title">绑定注册</div>
          <div class="s-c-text">有效的国内手机及国内邮箱</div>
          <div class="s-c-title">身份认证</div>
          <div class="s-c-text">提供资质及法定代表人身份证明</div>
          <div class="s-c-title">入驻函</div>
          <div class="s-c-text">入驻申请函/入驻公函(<span class="link">下载模版</span>)</div>
        </div>
      </div>
      <div class="step step3">
        <el-button class="btn" type="success">在线签约</el-button>
        <div class="s-contain">
          <div class="s-c-title">入驻审核</div>
          <div class="s-c-text">请及时接听电话并查看审核短信</div>
          <div class="s-c-title">创建运营工作群</div>
          <div class="s-c-text">平台指派专门服务经理建群、答疑、辅导及后续运营</div>
          <div class="s-c-title">激活账号</div>
          <div class="s-c-text">补充财税、经营信息等，完成其他账户功能开通及设置</div>
          <div class="s-c-title">签约并开通功能</div>
          <div class="s-c-text">规则、协议查看并签署</div>
        </div>
      </div>
      <div class="step step4">
        <el-button class="btn" type="success">商品发布</el-button>
        <div class="s-contain">
          <div class="s-c-title">品牌信息</div>
          <div class="s-c-text">主理人品牌及团队设置</div>
          <div class="s-c-title">首款商品发布 </div>
          <div class="s-c-text">对接商品信息及物料、投保</div>
          <div class="s-c-title">商品审核</div>
          <div class="s-c-text">平台及保险核保审核</div>
          <div class="s-c-title">商品上架</div>
          <div class="s-c-text">确认信息、库存、售价及优惠等</div>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button class="btn" style="color: #fff;" type="success" @click="handlerToSettled()">立即入驻</el-button>
      <el-button style="margin-left: 30px;border: 1px solid rgba(191, 191, 191, 1);" @click="() => router.push('./login')" class="gotoworkbench btn">登录工作台</el-button>
    </div>
  </section>

  <footer class="footer" id="section-7">
    <div class="footer">
      <div class="bot-wrapper" v-if="!isPhone">
        <div class="agreements">
          <a
            href="/agreements.html/6d2182627917deaf79ee081ef4530598"
            target="_blank"
            >用户协议 |
          </a>
          <a
            href="/agreements.html/17e6e460c5937c117744ce96cef64585"
            target="_blank"
            >隐私政策 |
          </a>
          <a
            href="/agreements.html/7ad7327497c095e7d1f8b85a1bfc7f99"
            target="_blank"
            >免责声明 |
          </a>
          <!--          <a-->
          <!--            href="/agreements.html/e8e134a6e1f8211c12e7d0bcf8da2dff"-->
          <!--            target="_blank"-->
          <!--            >版权声明 |-->
          <!--          </a>-->
          <!-- <a href="/dynamic.html/investment" target="_blank">营探招商平台 | </a> -->
          <a href="/agreements.html/aboutus" target="_blank">关于我们</a>
        </div>
        <p class="marginBottomPitch">
          联系电话:010-87511881&nbsp;&nbsp;(工作日9:00-18:00)&nbsp;&nbsp;联系邮箱:services@camptogo.com&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <!-- <p class="wpaddingb5">信箱:complaint@camptogo.com</p> -->
        <p class="marginBottomPitch">
          联系地址:
          北京市海淀区花园北路25号Epark(花园路社区)&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- 工作时间:09:00-18:00 -->
        </p>
        <div class="wtos6">
          <div class="copyrights marginTop0">
            <p>Copyright © 2021-2022 Camptogo. All Right Reserved</p>
          </div>
          <!-- 许可 -->
          <!-- <p>联系我们: services@camptogo.com</p> -->
          <div class="allowance">
            <div class="benowrap">
              <p>增值电信业务许可证：京B2-20202973</p>
              <p class="icp">ICP许可证：京ICP备2020034870号-1</p>
            </div>
            <a
              class="wideScreen ycenter"
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035862"
            >
              <img
                src="../../../assets/regis.ef881569.png"
                style="float: left; width: 1.3vw; height: 1.3vw"
              />
              <p style="float: left; margin: 0px 0px 0px 5px">
                京公网安备 11010802035862号
              </p>
            </a>
          </div>
          <!-- <p class="mobile icp">ICP许可证：京ICP备2020034870号-1</p> -->
          <a
            class="mobile icp ycenter"
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035862"
          >
            <img
              src="../../../assets/regis.ef881569.png"
              style="float: left; width: 1em; height: 1em"
            />
            <p style="float: left; margin: 0px 0px 0px 5px">
              京公网安备 11010802035862号
            </p>
          </a>
          <!-- <p>业务合作，请访问营探微信小程序/APP登记信息</p> -->
        </div>
      </div>
      <div class="bot-wrapper pppppp" v-if="isPhone">
        <div class="agreements">
          <a
            href="/agreements.html/6d2182627917deaf79ee081ef4530598"
            target="_blank"
            >用户协议 |
          </a>
          <a
            href="/agreements.html/17e6e460c5937c117744ce96cef64585"
            target="_blank"
            >隐私政策 |
          </a>
          <a
            href="/agreements.html/7ad7327497c095e7d1f8b85a1bfc7f99"
            target="_blank"
            >免责声明 |
          </a>
          <!-- <p> -->
          <!--          <a-->
          <!--            href="/agreements.html/e8e134a6e1f8211c12e7d0bcf8da2dff"-->
          <!--            target="_blank"-->
          <!--            >版权声明 |-->
          <!--          </a>-->
          <a href="/agreements.html/aboutus" target="_blank">关于我们</a>
          <!-- </p> -->
        </div>

        <p class="marginBottomPitch">
          联系电话:010-87511881&nbsp;&nbsp;(工作日9:00-18:00)
        </p>
        <p class="marginBottomPitch">联系邮箱:services@camptogo.com</p>
        <p class="marginBottomPitch">
          联系地址:北京市海淀区花园北路25号Epark(花园路社区)
        </p>
        <div class="wtos6">
          <div class="copyrights marginTop0">
            <p>Copyright © 2021-2022 Camptogo. All Right Reserved</p>
          </div>
          <div class="allowance">
            <div>增值电信业务许可证：京B2-20202973</div>
            <p>ICP许可证：京ICP备2020034870号-1</p>
            <a
              class="wideScreen ycenter"
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035862"
            >
              <img
                src="../../../assets/regis.ef881569.png"
                style="float: left; width: 1.3vw; height: 1.3vw"
              />
              <p style="float: left; margin: 0px 0px 0px 5px">
                京公网安备 11010802035862号
              </p>
            </a>
          </div>
          <a
            class="mobile icp ycenter"
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035862"
          >
            <img
              src="../../../assets/regis.ef881569.png"
              style="float: left; width: 1em; height: 1em"
            />
            <p style="float: left; margin: 0px 0px 0px 5px">
              京公网安备 11010802035862号
            </p>
          </a>
        </div>
      </div>
      <div class="aboutUs" v-if="!isPhone">
        <div class="xbox">
          <div class="QRCode"></div>
          <div class="xboxText windowSpecial">
            <p>营探官方公众号</p>
          </div>
        </div>
        <div class="xbox windowSpecial">
          <div class="QRCode weibo"></div>
          <div class="xboxText windowSpecial">
            <p>营探客服</p>
          </div>
        </div>
      </div>
      <div class="aboutUs phonePitch" v-if="isPhone">
        <div class="xbox">
          <div class="QRCode"></div>
          <div class="xboxText">营探官方公众号</div>
        </div>
        <div class="xbox">
          <div class="QRCode weibo"></div>
          <div class="xboxText">
            <p>营探客服</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="left">
      <div>
        <a>用户协议</a> <span>|</span> <a>隐私政策</a> <span>|</span> <a>免责声明</a>
        <span>|</span> <a>关于我们</a>
      </div>
      <div>
        <a>联系电话:010-87511881（工作日9:00-18:00）联系邮箱:services@camptogo.com</a>
      </div>
      <div><a>联系地址：北京市海淀区花园路北路25号Epark（花园路社区）</a></div>
      <div><a>Copyright © 2021-2022 Camptogo. All Right Reserved</a></div>
      <div>
        <a>增值电信业务许可证：京B2-20202973 ICP许可证: 京ICP备20200034870号-1</a>
      </div>
      <div>
        <img src="../../../assets/regis.ef881569.png" style="margin-right: 5px" />
        <a>京公网安备 11010802035862号</a>
      </div>
    </div>
    <div class="right">
      <div class="webo">
        <div class="weiboQR">
          <img src="../../../assets/miniapp.ec947916.jpg" />
        </div>
        <div class="texts">营探官方公众号</div>
      </div>
      <div class="gonzhonhao">
        <div class="wechatQR">
          <img src="../../../assets/qrCode1.png" />
        </div>
        <div class="texts">营探客服</div>
      </div>
    </div> -->
  </footer>

  <button class="jumpbutton" :class="{ highlight: currentSectionIndex != 0 }" @click="scrollToNextSection">
    <el-icon size="30px" color="white">
      <ArrowDownBold v-if="currentSectionIndex != 6" :class="{ highlight: currentSectionIndex != 0 }" />
      <ArrowUpBold v-if="currentSectionIndex === 6" />
    </el-icon>
  </button>
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

const handlerToSettled =()=>{
  router.push('/settled/step1')
}

const openServerWechatVisiable = ref(false)
const isPhone = ref(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
const form = reactive({
  email: '',
  applicant_name: '',
  contact_job: '',
  contact_name: '',
  phoneplatform: '',
  phoneplatform: ''
})

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

const currentSectionIndex = ref(0)
const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6','section-7']
const scrollToNextSection = () => {
  currentSectionIndex.value = (currentSectionIndex.value + 1) % sections.length
  const targetSection = document.getElementById(sections[currentSectionIndex.value])
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/cssvars.css";
@import "../../../style/App.css";
@import "../../../style/window.css";
@import "../../../style/mobile.css";
@import "../../../style/stylefix.css";
@font-face {
  font-family: 'youshe';
  src: url('../../../assets/font/Youshe.ttf');
}

@font-face {
  font-family: 'Nunito';
  src: url('../../../assets/font/Nunito-Black.ttf');
}

div, p, h1, h2, h3, h4, h5 {
  letter-spacing: 0.06em;
}

.header {
  z-index: 10001 !important;
  font-size: 1em;
}

.header-zhaoshang {
  color: #fff;
  .t-text {
    cursor: pointer;
  }
  .text-left {
    position: absolute;
    top: 40%;
    left: 5%;
    transform: translate(5%, -50%);
  }
  .text-right {
    position: absolute;
    top: 40%;
    right: 5%;
    transform: translate(5%, -50%);
  }
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
    background-position: center 125px;
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
    transform: translate(0, 64%);

  }

  .text {
    position: absolute;
    width: calc(100% - 10vw);
    z-index: 3;
    color: #fff;
    font-size: 18px;
    top: 30px;
    left: 5vw;
    display: flex;
    justify-content: space-between;
    font-family: PingFang SC;
    font-weight: 100;

    .t-text {
      cursor: pointer;
    }
  }
}

.kefu {
  width: 4.8em;
  height: 4.8em;
  background-color: #fff;
  z-index: 20000;
  position: fixed;
  right: 0;
  top: 20%;
  box-shadow: 0px -1px 2px -2px rgba(0, 0, 0, 0.16), 0px -3px 6px 0px rgba(0, 0, 0, 0.12), 0px -5px 12px 4px rgba(0, 0, 0, 0.09);
  display: flex;
  flex-direction: column;
  border-radius: 0.4em;
  padding: 0.4em;
  font-size: 0.8em;
  cursor: pointer;

  img {
    width: 1.6em;
    height: 1.6em;
    margin: auto auto 0.5em auto;
  }

  div {
    margin: 0 auto auto auto;
    color: #75B000;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 0.6em;
  }

  &:hover::before {
    content: "";
    width: 5em;
    height: 5em;
    position: absolute;
    left: -120%;
    top: -8%;
    background-color: #fff;
    background-image: url(../../../assets/qrCode1.png);
    background-size: cover;
    z-index: 999;
    border-radius: 0.5em;
  }

  &:hover {
    transition: transform 0.3s ease-in-out;
  }
}

/* 第一部分样式 */
.section1 {
  width: 100%;
  height: 100vh;
  // margin-top: -10px;
  // transform: translate(0, -8.177%);
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
      letter-spacing: 0.06em;
    }

    .buttons {
      margin-top: 8vh;

      .btn {
        // margin: 0 3vw 0 0;
        font-size: 1vw;
        padding: 0 1.4vw;
        height: 36px;
        border-radius: 1vh;
        z-index: 999;
        border: none;
        color: #93d500;
        // box-shadow: 0 0 3vh rgb(145 213 0 / 86%);
      }
      .btn2 {
        margin-left: 2vw;
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
    background-repeat: no-repeat;
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
    width: 100vw;
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
      width: 20vw;
      height: 100%;
      display: flex;

      .el-image {
        width: 3.8vw;
        height: 3.8vw;
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
  height: 100vh;
  position: relative;
  background-color: #fff;
  background-image: url(../../../assets/greenLinebg.png);
  background-size: 100%;
  background-repeat: no-repeat;

  .titleBox {
    display: flex;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    user-select: none;

    .left {
      img {
        width: 3.5vw;
        height: 3.5vw;
        margin: 10px 20px auto 0;
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
        letter-spacing: 0.06em;
      }

      .r-text {
        font-family: PingFang SC;
        font-size: 1.4vw;
        font-weight: 400;
        margin: 2.4vh 0;
        color: #333333;
      }
    }
  }

  .cards {
    width: 90vw;
    height: 22%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 43%;
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
    top: 70%;
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
    top: 18%;
  }

  .itemsBox {
    width: 100%;
    height: 55vh;
    position: absolute;
    top: 32%;
    // display: flex;

    .items {
      width: 74%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .item {
        position: relative;
        width: 40%;
        height: 23vh;
        border: 2px solid #75B000;
        border-radius: 1.3vw;
        box-shadow: 3px 6px 16px rgba(0, 0, 0, 0.03),
          0px -10px 32px rgba(0, 0, 0, 0.05);
        background-color: #fff;
        overflow: hidden;

        .text {
          padding: 2vh 3vh;
          color: #333333;
          user-select: none;
          position: relative;

          .t-title {
            font-family: PingFang SC;
            font-size: 1.4vw;
            font-weight: 550;
            margin: 1.6vh 0;
            color: rgba(51, 51, 51, 1);
          }

          .t-text {
            width: 85%;
            font-family: PingFang SC;
            font-size: 1vw;
            font-weight: 400;
            line-height: 1.6vw;
            margin: 2vh 0;
            color: rgba(0, 0, 0, 0.6);
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

        .new-img {
          position: absolute;
          width: 8vw;
          height: 8vw;
          right: 0;
          bottom: 0;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 1vw;
            left: 1vw;
          }
        }
      }
    }

    .items1 {
      transform: translate(-8%, 0);
    }

    .items2 {
      transform: translate(8%, 0);
      margin-top: 6%;
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
    z-index: 3;
  }

  .footer-text {
    position: absolute;
    bottom: 5vh;
    right: 5vw;
    font-size: 1vw;
    z-index: 999;
    color: #333333;
    span {
      text-decoration: underline;
    }
  }

  .panl {
    width: 70%;
    z-index: 4;
    bottom: 11%;
    height: 10vh;
    position: absolute;
    display: flex;
    justify-content: space-around;
    left: 50%;
    transform: translate(-50%);

    .smallFooterPanl {
      width: 23.5%;
      height: 100%;
      background-image: url(../../../assets/smallFooterPanl.png);
      background-repeat: no-repeat;
      background-size: 100%;
      transform: translate(3px);
    }

    .panl1 {
      left: 18.5%;
    }

    .panl2 {
      left: calc(18.5% * 2);
    }

    .panl3 {
      left: calc(18.5% * 3);

    }
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
      margin-top: 2.5vh;

    }
  }

  .items {
    width: 70%;
    height: 45vh;
    // display: flex;
    // justify-content: space-around;
    position: absolute;
    top: 35%;
    z-index: 5;
    left: 50%;
    transform: translate(-50%);

    .card-items {
      // width: 70%;
      height: 45vh;
      display: flex;
      justify-content: space-around;
      // position: absolute;
      // top: 35%;
      // z-index: 5;
      // left: 50%;
      // transform: translate(-50%);
      .card-item {
        width: 22%;
        height: 100%;
        .item {
          // width: 22%;
          width: 100%;
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
            color: rgba(38, 38, 38, 0.6);
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

        .smallFooterPanl {
          width: 100%;
          z-index: 4;
          bottom: 11%;
          height: 10vh;
          margin-top: -4px;
          display: flex;
          justify-content: space-around;
          transform: translate(-50%);
          // width: 23.5%;
          // height: 100%;
          background-image: url(../../../assets/smallFooterPanl.png);
          background-repeat: no-repeat;
          background-size: 100%;
          transform: translate(3px);
        }

        .panl1 {
          left: 18.5%;
        }

        .panl2 {
          left: calc(18.5% * 2);
        }

        .panl3 {
          left: calc(18.5% * 3);
        }
      }
    }
  }

  .btns {
    width: 100%;
    position: absolute;
    bottom: 6%;
    z-index: 6;
    display: flex;
    justify-content: center;
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
    width: 30%;
    height: 30vh;
    position: absolute;
    top: 24%;
    left: 5vw;
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
    height: 68vh;
    position: absolute;
    right: 5%;
    bottom: 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card {
      width: 45%;
      height: 38%;
      // margin: auto;
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
          font-size: 1.4vw;
          font-weight: 500;
          color: #333333;
        }

        .c-text {
          margin-top: 2vh;
          color: #666;
          font-family: PingFang SC;
          font-size: 1vw;
          font-weight: 400;
          line-height: 1.5vw;
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

  .bigTitle {
    font-family: PingFang SC;
    font-size: 2.3vw;
    font-weight: 550;
    position: absolute;
    left: 5vw;
    top: 15%;
  }

  .map {
    width: 95%;
    height: 90%;
    background-image: url(../../../assets/map.png);
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 1vh;
  }

  .setps {
    width: 100%;
    height: 70%;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 2;
    position: absolute;
    bottom: 8%;
    left: 5vw;
    // transform: translate(-48%);
    display: flex;
    justify-content: space-between;

    .step {
      width: 23%;
      height: 100%;

      .btn {
        // width: 9vw;
        padding: 0 20px;
        margin-bottom: 2vh;
        color: #fff;
        font-size: 16px;
      }

      .s-contain {
        width: 100%;

        .s-c-title {
          width: 100%;
          border-left: 3px solid #95D600;
          padding-left: 0.5vw;
          font-family: PingFang SC;
          font-size: 1vw;
          font-weight: 550;
          color: #333333;
          margin: 1vh 0;
        }

        .s-c-text {
          width: 78%;
          font-family: PingFang SC;
          padding-left: 0.5vw;
          font-size: 0.9vw;
          color: #585858;
          line-height: 3.6vh;
        }
      }

      .link {
        color: #93d500;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .step1 {
      margin-top: 24vh;
    }

    .step2 {
      margin-top: 16vh;
    }

    .step3 {
      margin-top: 8vh;
    }
  }

  .line2 {
    width: 80%;
    height: 40%;
    background-image: url(../../../assets/line3.png);
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 3;
    position: absolute;
    left: 5vw;
    top: 5%;
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 5%;
    z-index: 5;
    .btn {
      font-size: 1vw;
      padding: 0 1.4vw;
      height: 4.7vh;
      border-radius: 1vh;
      z-index: 999;
      border: none;
      color: #93d500;
    }
  }
}

.footer {
  // background-color: #4d4d4d;
  // height: 237px;

  .left {
    padding: 34px;
    float: left;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #fff;

    div {
      margin: 4px;
    }

    a {
      color: #bdbdbd;
      text-decoration: none;
      font-size: 12px;
      text-align: left;
      cursor: pointer;

      &:hover {
        color: #93d500;
      }
    }

    span {
      color: #bebebe;
      margin: 2px;
    }
  }

  .right {
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    top: 20px;
    align-items: center;
    float: right;
    width: 400px;
    height: 180px;
    margin-right: 70px;

    .webo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .weiboQR {
        img {
          height: 95px;
          margin: 10px;
          float: right;
        }
      }

      .texts {
        color: #fff;
        font-size: 10px;
        position: relative;
      }
    }

    .gonzhonhao {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .wechatQR {
        img {
          float: right;
          height: 95px;
          margin: 10px;
        }
      }

      .texts {
        color: #fff;
        font-size: 10px;
        position: relative;
      }
    }
  }

  .texts {
    font-size: 18px;
    color: #fff;
    position: absolute;
  }
}

.jumpbutton {
  position: fixed;
  width: 6vh;
  height: 6vh;
  bottom: 25px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border-color: #fff;
  cursor: pointer;
  border: 2.6px solid white;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.highlight {
  border-color: #dfefb4;
  color: #dfefb4;
}

.bot-wrapper {
  padding-left: 50px;
}

div.bot-wrapper div {
  margin-top: 0;
}
.bot-wrapper .agreements {
  margin-bottom: 1em !important;
  padding-top: 1em !important;
  white-space: nowrap;
}
.wtos6 {
  margin-top: -5px !important;
}
.wtos6 div {
  margin-bottom: 1em !important;
}
.bot-wrapper > p {
  margin-bottom: 1em !important;
}
.shouldKnow {
  transform: translateY(100%);
  width: 0;
  white-space: nowrap;
  font-size: 0.7rem;
  color: #4d4d4d;
}
.shouldKnow > a {
  text-decoration: none;
  color: #93d500;
}
.weibo {
  background-image: url(../../../assets/qrCode1.png) !important;
  margin-right: 2em;
}
.phonePitch {
  flex-direction: row !important;
  flex-wrap: nowrap;
  transform: scale(0.7);
  transform-origin: left;
  padding-left: 1em;
}
.xbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: min-content;
  padding-right: 1em;
}
.xboxText {
  padding-top: 1rem;
  width: min-content;
  font-size: 0.7em;
  color: white;
  white-space: nowrap;
}
.xbox .weibo {
  margin: 0;
}
common-button24277 {
  margin-right: 3em;
}
.pppppp div,
.pppppp p {
  white-space: nowrap;
}

@media only screen and (max-width: 483px) {
  .section1 {
    // transform: translate(0, -15%);
    .left {
      top: 10vh;
      width: 95%;
      .pageTitle {
        font-size: 2.4em;
        margin-bottom: 2.4vh;
      }
      h2 {
        font-size: 1em;
      }
      .buttons {
        margin-top: 5vh;
        .btn {
          padding: 0.8em 1.5em;
          height: auto;
          font-size: 0.8em;
        }
        .btn2 {
          margin-left: 4vw;
        }
      }
    }
    .person {
      width: 8.46em;
      height: 15.4em;
      bottom: 26%;
      right: 18%;
    }
    .fog {
      width: 4.6em;
      height: 5.4em;
      bottom: 30%;
      right: 6%;
    }
    .spaceShip {
      width: 7.4em;
      height: 7.6em;
      top: 50%;
      right: 38%;
    }
    .bigCloud {
      width: 7.2em;
      height: 3.2em;
      right: 6%;
      bottom: 42%;
    }
    .mask {
      // background-size: 120%;
      background-position: 0 3vh;
      background-image: url(../../../assets/mask-1.png);
    }
    .cloud1 {
      width: 2.4em;
      height: 1.66em;
      top: 38%;
      left: 2%;
    }
    .cloud2 {
      width: 2.4em;
      height: 1.66em;
      top: 46%;
      left: 90%;
    }
    .cloud3 {
      width: 4.4em;
      height: 3.2em;
      transform: scale(1, 1);
      top: 67%;
      left: 20%;
    }
    .cloud4 {
      width: 4.9em;
      height: 2.1em;
      top: 66%;
      left: 82%;
      transform: scale(1.2);
    }
    .cloud5 {
      width: 3.6em;
      height: 2.5em;
      top: 40%;
      left: 40%;
    }
    .balls {
      width: 18em;
      height: 2.8em;
      bottom: 42%;
      right: 3%;
    }
    .footer {
      flex-wrap: wrap;
      height: 24vh;
      border-top: none;
      bottom: 2vh;
      background-color: rgb(0, 0, 0, 0);;
      .item {
        width: 50vw;
        height: 50%;
        .el-image {
          // width: 2.5em;
          // height: 2.5em;
          width: 10vw;
          height: 10vw;
        }
        .text {
          width: 76%;
          margin-left: 2vw;
          .t-text1 {
            font-size: 1em;
            margin-bottom: 0.6vh;
          }
          .t-text2 {
            font-size: 0.6em;
          }
        }
      }
      .item:nth-child(2n-1) {
        padding-left: 5vw;
      }
      .item:nth-child(2n) {
        padding-right: 5vw;
      }
    }
  }
  .section2 {
    background-image: url(../../../assets/greenLinebg-1.png);
    .titleBox {
      top: 10%;
      left: 5%;
      transform: translate(0);
      margin: 0 auto;
      .left {
        img {
          width: 1.8em;
          height: 1.8em;
          margin: 0.6em 0.6em auto 0;
        }
      }
      .right {
        .r-title {
          font-size: 1em;
        }
        .r-text {
          margin: 1.2em 0;
          font-size: 0.8em;
        }
      }
    }
    .cards {
      height: 46%;
      flex-wrap: wrap;
      top: 25%;
      .card {
        height: 36%;
        width: 30%;
        border: 1px solid #75B000;
        border-radius: 10px;
        box-shadow: 3px 0px 8px rgb(210 230 161);
        img {
          width: 3em;
          height: 3em;
        }
        div {
          font-size: 0.8em;
        }
      }
    }
  }
  .section3 {
    background-image: url(../../../assets/greenLinebg2-1.png);
    .title {
      padding-left: 5%;
      text-align: left;
      top: 12%;
      font-size: 1.1em;
    }
    .itemsBox {
      top: 20%;
      .items1,
      .items2 {
        transform: translate(0, 0);
      }
      .items2 {
        margin-top: 0;
      }
      .items {
        flex-direction: column;
        width: 80%;
        .item {
          width: 100%;
          height: 16vh;
          border: 1px solid #75B000;
          border-radius: 10px;
          margin-bottom: 1em;
          .text {
            padding: 2vw 3vw;
            .t-title {
              font-size: 1em;
              margin: 2vw 0;
            }
            .t-text {
              width: 90%;
              height: auto;
              line-height: normal;
              font-size: 0.8em;
              margin: 2vw 0;
            }
          }
          .new-img {
            width: 3em;
            height: 3em;
          }
        }
      }
    }
  }
  .section4 {
    .title {
      top: 14%;
      left: 10%;
      .t-title {
        font-size: 1.1em;
        text-align: left;
      }
      .t-text {
        font-size: 0.8em;
        text-align: left;
        margin-top: 0.8em;
      }
    }
    .footer-text {
      font-size: 0.8em;
    }
    .items {
      width: 100%;
      top: 40%;
      height: 55vh;
      overflow: auto;
      .card-items {
        width: 235vw;
        height: 44vh;
        padding: 0 20vw;
        justify-content: space-between;
        .card-item {
          height: 42vh;
          width: 60vw;
          .item {
            width: 60vw;
            border: 1px solid #75B000;
            border-radius: 10px;
            box-shadow: 7.24px 0px 19.3px -9.65px rgba(117, 176, 0, 0.1), 10.86px 0px 33.78px 0px rgba(117, 176, 0, 0.08);
            .i-title {
              font-size: 1.2em;
            }
            .i-text {
              margin: 2em 0 3em 0;
              font-size: 0.8em;
            }
            .textBox {
              .tb-text {
                font-size: 0.8em;
              }
            }
          }
        }
      }
    }
    .footerPanl {
      background-size: 300%;
      background-position: -50vw 3em;
    }
  }
  .section5 {
    background: none;
    .computer {
      width: 66.4vw;
      height: 69.3vw;
      bottom: 50vh;
    }
    .ques {
      top: 14%;
      .q-title {
        font-size: 1.1em;
      }
    }
    .cards {
      width: 80%;
      height: 72vh;
      right: 10%;
      flex-direction: column;
      .card {
        width: 100%;
        height: 22%;
        border: 1px solid #75B000;
        border-radius: 10px;
        box-shadow: 7.24px 0px 19.3px -9.65px rgba(117, 176, 0, 0.1), 10.86px 0px 33.78px 0px rgba(117, 176, 0, 0.08);
        .cardIcon {
          width: 4em;
          height: 4em;
          margin: auto 0;
        }
        .container {
          padding: 0.5em 0;
          .c-title {
            font-size: 1em;
          }
          .c-text {
            font-size: 0.8em;
            margin-top: 0.8em;
            line-height: normal;
          }
        }
      }
    }
  }
  .section6 {
    .bigTitle {
      font-size: 1.1em;
      top: 14%;
    }
    .map {
      background-image: url(../../../assets/map-1.png);
    }
    .line2 {
      width: 72%;
      height: 72%;
      left: 24vw;
      top: 14%;
      z-index: 0;
      background-image: url(../../../assets/line3-1.png);
    }
    .setps {
      width: 90%;
      bottom: 10%;
      .step {
        position: absolute;
        width: 50%;
        height: auto;
        .btn {
          font-size: 0.8em;
          color: #fff;
          padding: 0 1em;
          margin-bottom: 0.6em;
        }
        .s-contain {
          .s-c-title {
            border-left: 2px solid #95D600;
            padding-left: 0.6em;
            font-size: 0.8em;
            margin: 0.4em 0 !important;
          }
          .s-c-text {
            width: 100%;
            padding-left: 0;
            line-height: 1.8em;
            font-size: 0.6em;
          }
        }
      }
      .step1 {
        margin-top: 0;
      }
      .step2 {
        position: absolute;
        margin-top: 0;
        left: 55%;
        top: 2%;
      }
      .step3 {
        position: absolute;
        margin-top: 0;
        left: 5%;
        top: 38%;
      }
      .step4 {
        position: absolute;
        margin-top: 0;
        left: 60%;
        top: 40%;
      }
    }
    .btns {
      bottom: 12%;
      .btn {
        font-size: 0.8em;
        height: auto;
        padding: 0.8em 1.5em;
      }
    }
  }
  .footer {
    .left {
      width: 60%;
    }
  }
}
</style>
