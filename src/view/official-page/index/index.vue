<template>
  <!-- 头部 -->
  <header>
    <div class="headerimg">
      <div class="greencloud"></div>
      <div class="logo"></div>
    </div>
  </header>
  <!-- 第一部分 -->
  <section v-view="'fade-in'" class="Pageone" id="section-1">
    <div class="Pageonetitle">
      <h1 class="pageTitle"><span>营地奇遇</span><span>探手可得</span></h1>
      <h2 class="content">
        <span>亲子营</span>|<span>独立日间营</span>|<span>冬夏令营</span>|<span>游学</span>|<span>研学</span>|<span>产融实践</span>
        | <span>竞赛集训</span>
      </h2>
    </div>

    <div class="buttons">
      <el-button @click="() => router.push('./login')" class="gotoworkbench">登录工作台</el-button>
      <el-button class="gotInvestplatform" @click="() => router.push('./merchant')">招商平台</el-button>
      <div>
        <div class="eggBg" :style="imgSize"></div>
      </div>
      <div class="flogBg mousePointer" :style="flogStyle"></div>
      <div class="spaceBox mousePointer" :style="spaceStyle">
        <div class="spaceBg"></div>
        <div class="lightBg mousePointer" :style="lightStyle"></div>
      </div>
      <div class="spacemanBg mousePointer" :style="spacemanStyle"></div>
      <div class="planetBg mousePointer" :style="planetstyle"></div>
      <div class="starLight">
        <div class="starBg"></div>
      </div>
    </div>
    <div class="imgsone"></div>
  </section>
  <div class="cloudBg"></div>
  <div class="doublecloud"></div>
  <!-- 第二部分 -->
  <section class="section2 PageTwo" v-view="'fade-in'" id="section-2">
    <!-- <div class="rocket"></div> -->
    <div class="uniCampBox">
      <div class="img day"></div>
      <div class="daytexts">
        <h1 class="theme_ZN">日间营</h1>
        <h2 class="theme_EN">Day Camps</h2>
      </div>
      <div class="theme_show inshow">
        <p>想掌控自己的夜晚？</p>
        <p>没问题！把白天交给我们，无需<br />在营地过夜就可体验丰富单日/<br />多日活动。</p>
      </div>
    </div>
    <div class="uniCampBox">
      <div class="img future"></div>
      <div class="Pagetwotitle">
        <h1 class="pageTitle">探你所寻!</h1>
        <h2 class="content">The Future Is Now!</h2>
      </div>
    </div>
    <div class="uniCampBox">
      <div class="img solo"></div>
      <div class="solotexts">
        <h1 class="theme_ZN">单飞营</h1>
        <h2 class="theme_EN">Solo Camps</h2>
      </div>
      <div class="theme_show inshow">
        <p>想与孩子度过假期并各自成<br />长？</p>
        <p>没问题！分开行动，各自享受属<br />于自己同龄群体的营地生活。</p>
      </div>
    </div>
    <div class="uniCampBox">
      <img class="img family" src="../../../assets/3.png" />
      <div class="familytexts">
        <h1 class="theme_ZN">亲子营</h1>
        <h2 class="theme_EN">Family Camps</h2>
      </div>
      <div class="theme_show inshow">
        <p>想建立理想的亲子关系？</p>
        <p>没问题！您与还在在全新的场景<br />下，共同认识这个奇妙的世界。</p>
      </div>
    </div>
    <div class="uniCampBox">
      <img class="img theme" src="../../../assets/4.png" />
      <div class="themetexts">
        <h1 class="theme_ZN">主题营</h1>
        <h2 class="theme_EN">Theme Camps</h2>
      </div>
      <div class="theme_show inshow">
        <p class="theme_intheme">偏爱大自然，喜欢做研究，中意<br />户外运动，乐于搞创作？</p>
        <p class="theme_intext">没问题！丰富的主题产品供你选择。</p>
      </div>
    </div>
    <div class="uniCampBox">
      <img class="img sleep" src="../../../assets/5.png" />
      <div class="sleeptexts">
        <h1 class="theme_ZN">独立营</h1>
        <h2 class="theme_EN">Sleep-away Camps</h2>
      </div>
      <div class="theme_show inshow">
        <p>想把夜晚分享给伙伴？</p>
        <p class="sleep_intext">
          没问题！独立自信的品质将被唤<br />醒，沟通力，合作力将有质的飞跃。
        </p>
      </div>
    </div>
  </section>
  <!-- 第三部分 -->
  <section class="section3" v-view="'fade-in'" id="section-3">
    <WordCircleVue />
    <div class="background"></div>
  </section>
  <!-- 第四部分 -->
  <section class="section4" v-view="'fade-in'" id="section-4">
    <div class="could1"></div>
    <div class="could2"></div>
    <div class="could3"></div>
    <div class="could4"></div>
    <div class="could5"></div>
    <h2 class="Pageforetitle">营探标准</h2>
    <div class="stable">
      <p>
        <span class="big">S</span><span class="small">afe</span><span class="text">人身安全</span><span
          class="text">资金安全</span><span class="text">信息安全</span>
      </p>
      <p>
        <span class="big">H</span><span class="small">igh</span><span class="text">高资质团队</span><span
          class="text">高质量教育</span><span class="text">高标准服务</span>
      </p>
      <p>
        <span class="big">A</span><span class="small">ll</span><span class="text">ALL Day</span><span class="text">ALL
          Seasons</span><span class="text">ALL Types</span>
      </p>
      <p>
        <span class="big">R</span><span class="small">ich</span><span class="text">丰富主题</span><span
          class="text">海量活动</span><span class="text">多维展示</span>
      </p>
      <p>
        <span class="big">E</span><span class="small">asy</span><span class="text">多端覆盖</span><span
          class="text">高级检索</span><span class="text">一站预定</span>
      </p>
    </div>

    <div class="download">
      <div class="iphone_download">
        <img src="../../../assets/iphone.png" />
        <p>iPhone/iPad下载</p>
      </div>

      <div class="wechat_download">
        <img src="../../../assets/wechat.png" />
        <p>Wechat小程序</p>
      </div>
    </div>
  </section>
  <!-- 第五部分 -->
  <section class="section5" v-view="'fade-in'" id="section-5">
    <h1 class="Pagefivetitle">
      <div>有品质</div>
      <div>有温度</div>
      <div>有态度</div>
    </h1>
    <div class="Logos">
      <img class="logo" src="../../../assets/ICF_LOGO.15c136c2.png" />
      <img class="logo" src="../../../assets/chinaums.b787daac.png" />
      <img class="logo" src="../../../assets/zhongjian.dac24e40.png" />
      <img class="logo" src="../../../assets/tianan.babc5765.png" />
      <img class="logo" src="../../../assets/icbc.5063a679.png" />
    </div>
  </section>
  <!-- 底部 -->
  <footer class="footer">
    <div class="left">
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
          <img src="../../../assets/qrCode.jpg" />
        </div>
        <div class="texts">营探客服</div>
      </div>
      <div class="gonzhonhao">
        <div class="wechatQR">
          <img src="../../../assets/miniapp.ec947916.jpg" />
        </div>
        <div class="texts">营探官方公众号</div>
      </div>
    </div>
  </footer>
  <!-- 跳转按钮 -->
  <button class="jumpbutton" :class="{ highlight: currentSectionIndex === 0 }" @click="scrollToNextSection">
    <el-icon size="30px" color="white">
      <ArrowDownBold v-if="currentSectionIndex != 4" :class="{ highlight: currentSectionIndex === 0 }" />
      <ArrowUpBold v-if="currentSectionIndex === 4" />
    </el-icon>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import WordCircleVue from './components/CircleWords/index.vue'
import { gReactiveImgAnimation, gSizeAndP, gSize } from "../../../utils/gStyle"
import { ideaScreen } from "../../../utils/ideaScreen"
import { ref, onMounted, onUnmounted, computed } from 'vue'

// const currentSectionIndex = ref(0)
// const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5']
// const scrollToNextSection = () => {
//   currentSectionIndex.value = (currentSectionIndex.value + 1) % sections.length
//   const targetSection = document.getElementById(sections[currentSectionIndex.value])
//   if (targetSection) {
//     targetSection.scrollIntoView({ behavior: 'smooth' })
//   }
//   console.log(currentSectionIndex.value)
// }
// const router = useRouter()

    const currentSectionIndex = ref(0);
    const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
    // const isPhone = ref(false);
    let screenH = ref(window.innerHeight);
    let screenW = ref(window.innerWidth);
    const router = useRouter()

    const scrollToNextSection = () => {
      currentSectionIndex.value = (currentSectionIndex.value + 1) % sections.length;
      const targetSection = document.getElementById(sections[currentSectionIndex.value]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const isPhone = ref(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))

    // 添加resize事件监听器
    const handleResize = () => {
      if (!isPhone.value) {
        // 解决苹果浏览器下滑导航栏消失引起的页面resize
        screenH.value = window.innerHeight;
        screenW.value = window.innerWidth;
      }
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        isPhone.value = true;
      } else {
        isPhone.value = false;
      }
    }

    const reactive = computed(() => {
      const device = isPhone.value ? "phone" : "window";
      const wpx = screenW.value / ideaScreen[device].width;
      const hpx = screenH.value / ideaScreen[device].height;
      const ipx = Math.min(wpx, hpx);
      return {
        wpx,
        hpx,
        ipx,
      };
    })
    const gSection = computed(() => `height:${window.innerHeight}px`);
    const imgSize = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            782 * reactive.value.ipx,
            130 * reactive.value.ipx,
            148 * reactive.value.wpx,
            screenH.value * 0.5
            // 1352 * reactive.value.hpx
          )
        : {
            // height: window.innerHeight / 2 + "px",
            height: screenH.value * 0.5 + "px",
            width: 1078 * reactive.value.wpx + "px",
          };
    });
    const starLightStyle = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            291 * reactive.value.ipx,
            283 * reactive.value.ipx,
            356 * reactive.value.wpx,
            771 * reactive.value.hpx
          )
        : gSizeAndP(
            291 * reactive.value.ipx,
            283 * reactive.value.ipx,
            863 * reactive.value.wpx,
            467 * reactive.value.hpx
          );
    });
    const lightStyle = computed(() => gSize(142 * reactive.value.ipx, 180 * reactive.value.ipx));
    const spaceStyle = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            202 * reactive.value.ipx,
            160 * reactive.value.ipx,
            757 * reactive.value.wpx,
            918 * reactive.value.hpx
          )
        : gSizeAndP(
            202 * reactive.value.ipx,
            160 * reactive.value.ipx,
            1221 * reactive.value.wpx,
            523 * reactive.value.hpx
          );
    });
    const planetstyle = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            182 * reactive.value.ipx,
            130 * reactive.value.ipx,
            98 * reactive.value.wpx,
            933 * reactive.value.hpx
          )
        : gSizeAndP(
            182 * reactive.value.ipx,
            130 * reactive.value.ipx,
            506 * reactive.value.wpx,
            599 * reactive.value.hpx
          );
    });
    const starStyle = computed(() => gSize(74 * reactive.value.ipx, 75 * reactive.value.ipx));
    const flogStyle = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            150 * reactive.value.ipx,
            237 * reactive.value.ipx,
            577 * reactive.value.wpx,
            1040 * reactive.value.hpx
          )
        : gSizeAndP(
            150 * reactive.value.ipx,
            237 * reactive.value.ipx,
            995 * reactive.value.wpx,
            668 * reactive.value.hpx
          );
    });
    const spacemanStyle = computed(() => {
      return isPhone.value
        ? gSizeAndP(
            307 * reactive.value.ipx,
            452 * reactive.value.ipx,
            254 * reactive.value.wpx,
            953 * reactive.value.hpx
          )
        : gSizeAndP(
            314 * reactive.value.ipx,
            445 * reactive.value.ipx,
            672 * reactive.value.wpx,
            581 * reactive.value.hpx
          );
    });

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    })

</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

section {
  overflow: hidden;
}

body {
  -ms-overflow-style: none;

  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

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
  position: fixed;
  top: -10px;
  width: 100vw;
  z-index: 903;

  .greencloud {
    width: 100%;
    height: 18vh;
    background-image: url(../../../assets/banner.png);
    background-repeat: no-repeat;
    background-size: 100%;
    transform: translateY(-2.5vh);
    background-position: center;
    z-index: -1;
  }

  .logo {
    width: 27vh;
    height: 4.5vh;
    background-image: url(../../../assets/white-yintan.png);
    background-position: center;
    background-size: 100% 100%;
    position: absolute;
    background-repeat: no-repeat;
    top: 5.5vh;
    left: 50%;
    transform: translate(-50%, -48%);
    z-index: 2;
  }
}

/* 第一部分样式 */
.Pageone {
  width: 100%;
  background-color: #c2e76b !important;
  height: 100vh;
  position: relative;

  .mousePointer {
    cursor: pointer;
  }

  .eggBg {
    position: absolute;
    width: 56vw;
    height: 18vh;
    top: 67%;
    left: 22%;
    z-index: 901;
    background-image: url(../../../assets/OfficialWebsiteImgs/eggs.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .flogBg {
    position: absolute;
    width: 8vw;
    height: 22vh;
    top: 59%;
    left: 52%;
    background-image: url(../../../assets/OfficialWebsiteImgs/flog.png);
    background-size: 600% 100%;
    background-position: 0 0;
    z-index: 901;
  }

  .flogBg:hover {
    animation: flog 1.2s steps(1, end) infinite;
  }

  @keyframes flog {
    0% {
      background-position: 0 0;
    }

    20% {
      background-position: -100% 0;
    }

    40% {
      background-position: -200% 0;
    }

    60% {
      background-position: -300% 0;
    }

    80% {
      background-position: -400% 0;
    }

    100% {
      background-position: -500% 0;
    }
  }

  .spaceBox {
    position: absolute;
    z-index: 901;
    left: 63%;
    top: 44%;
  }

  .spaceBg {
    position: absolute;
    // width: 10.5vw;
    // height: 14.8vh;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/OfficialWebsiteImgs/space.png);
    background-size: 1400% 100%;
    background-position: 0 0;
    z-index: 900;
  }

  .spaceBox:hover .spaceBg {
    animation: space 1.4s steps(1, end) infinite;
  }

  .lightBg {
    width: 6.26vw;
    height: 18vh;
    background-image: url(../../../assets/OfficialWebsiteImgs/light.png);
    background-size: 100% 100%;
    z-index: 901;
    background-size: auto 0%;
    background-position: center 0;
    transform-origin: right top;
    transform: translateX(54%) rotate(13deg) translateY(85%);
    background-repeat: no-repeat;
    transition: background-size 0.2s cubic-bezier(0.78, 0.31, 0.92, 0.55), opacity 0.2s ease;
    opacity: 0;
    z-index: 900;
  }

  .spaceBox:hover .lightBg {
    background-size: auto 100%;
    opacity: 1;
  }

  @keyframes space {
    0% {
      background-position: 0 0;
    }

    7.5% {
      background-position: -100% 0;
    }

    15% {
      background-position: -200% 0;
    }

    23% {
      background-position: -300% 0;
    }

    30.5% {
      background-position: -400% 0;
    }

    38% {
      background-position: -500% 0;
    }

    45.5% {
      background-position: -600% 0;
    }

    53% {
      background-position: -700% 0;
    }

    61% {
      background-position: -800% 0;
    }

    68.5% {
      background-position: -900% 0;
    }

    77.5% {
      background-position: -1000% 0;
    }

    85% {
      background-position: -1100% 0;
    }

    92.5% {
      background-position: -1200% 0;
    }

    100% {
      background-position: -1300% 0;
    }
  }

  .spacemanBg {
    position: absolute;
    width: 16vw;
    height: 41.9vh;
    top: 50%;
    left: 35%;
    background-image: url(../../../assets/OfficialWebsiteImgs/people.png);
    background-size: 400% 100%;
    background-position: 0 0;
    z-index: 901;
  }

  .spacemanBg:hover {
    animation: spaceman 1.2s steps(1, end) infinite;
  }

  @keyframes spaceman {
    0% {
      background-position: 0 0;
    }

    33% {
      background-position: -100% 0;
    }

    67% {
      background-position: -200% 0;
    }

    100% {
      background-position: -300% 0;
    }
  }

  .planetBg {
    width: 11vw;
    height: 12.9vh;
    top: 52%;
    left: 25%;
    position: absolute;
    background-image: url(../../../assets/OfficialWebsiteImgs/planet.png) !important;
    background-size: 100% 100%;
    z-index: 901;
  }

  .planetBg:hover {
    /* transform: scale(1.1); */
    background-image: url(../../../assets/OfficialWebsiteImgs/planet.gif) !important;
  }

  .starLight {
    position: absolute;
    display: flex;
    width: 10.5vw;
    height: 18.5vh;
    top: 42%;
    left: 47%;
    z-index: 0;
    background-image: url(../../../assets/OfficialWebsiteImgs/starLight.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    animation: light 1s ease infinite;

    .starBg {
      position: relative;
      width: 3.9vw;
      height: 7vh;
      margin: auto;
      background-image: url(../../../assets/OfficialWebsiteImgs/star.png);
      background-size: 100% 100%;
    }
  }

  @keyframes light {
    0% {
      background-size: 100% 100%;
    }

    20% {
      background-size: 80% 80%;
    }

    50% {
      background-size: 60% 60%;
    }

    70% {
      background-size: 80% 80%;
    }

    100% {
      background-size: 100% 100%;
    }
  }

  .Pageonetitle {
    .pageTitle {
      padding-top: 20vh !important;
      // transform: translateY(30%) ;
      display: flex;
      font-size: 4.4vw;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-family: youshe;
      font-weight: normal;

      span {
        margin-left: 2vw;
        margin-right: 2vw;
      }
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3.2vh;
      font-family: Nunito !important;
      color: #fff;
      font-weight: 400;

      span {
        margin: 3.2vw 2vw 3.2vw 2vw;
      }
    }
  }

  .imgsone {
    display: flex;
    justify-content: center;
    align-items: center;

    .people {
      position: absolute;
      height: 333px;
      width: 235px;
      top: 52%;
      left: 34%;
      z-index: 999;
    }

    .flog {
      position: absolute;
      height: 178px;
      width: 112px;
      top: 500px;
      left: 735px;
      padding-left: 50px;
      z-index: 999;
    }

    .plant {
      position: absolute;
      height: 98px;
      width: 136px;
      top: 440px;
      left: 350px;
      z-index: 999;
    }

    .space {
      position: absolute;
      height: 120px;
      width: 151px;
      top: 400px;
      left: 920px;
      z-index: 999;
    }

    .start {
      position: absolute;
      height: 56.2px;
      width: 55px;
      top: 410px;
      left: 710px;
      padding-left: 30px;
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .gotoworkbench {
    font-size: 1.2vw;
    margin-right: 2vw;
    width: 8.5vw;
    height: 4.5vh;
    border-radius: 1vh;
    border: none;
    color: #93d500;
    z-index: 999;
    box-shadow: 0 0 3vh #91d500dc;
  }

  .gotoworkbench:hover {
    background-color: #f5fde3e2;
    color: #93d500;
  }

  .gotInvestplatform {
    font-size: 1.2vw;
    margin-left: 2vw;
    width: 8.5vw;
    height: 4.5vh;
    border-radius: 1vh;
    z-index: 999;
    border: none;
    color: #93d500;
    box-shadow: 0 0 3vh #91d500dc;
  }

  .gotInvestplatform:hover {
    background-color: #f5fde3e2;
    color: #93d500;
  }
}

// 动的云
.doublecloud {
  height: 50vh;
  background-image: url(../../../assets/doublecloud.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 800vh;
  position: absolute;
  top: 70vh;
  width: 100%;
  z-index: 900;
  animation: scroll 180s linear infinite;
}

@keyframes scroll {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

/* 第二部分样式 */
.PageTwo {
  display: flex;
  background-color: #dfefb4;
  height: 100vh;
  position: relative;
  width: 100vw;
  overflow: hidden;

  .Pagetwotitle {
    padding-top: 280px;

    .pageTitle {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 57px;
      font-family: youshe;
      position: relative;
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      font-family: Nunito;
    }
  }

  .uniCampBox {
    display: flex;
    justify-content: center;
    align-items: center;

    .theme_show {
      left: 0;
      opacity: 0;
      position: absolute;
      top: 300px;
      left: 60px;
      background-color: whitesmoke;
    }

    &:hover {
      .theme_show {
        opacity: 90%;
        background-color: whitesmoke;
        transition: all 0.5s;
        left: 80px;
        border-radius: 15px;
        padding: 10px;

        :nth-child(1) {
          font-size: 15.4px;
          font-weight: bolder;
          line-height: 1.5;
        }

        :nth-child(2) {
          font-size: 14px;
          line-height: 1.5;
        }
      }

      .img {
        transform: scale(0.4);
      }
    }

    width: 33vw;
    height: 49vh;
    position: relative;

    .img {
      transform: scale(0.37);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      transition: transform 0.3s ease-in-out;
    }

    .day {
      width: 70vw;
      height: 105vh;
      background-image: url(../../../assets/0.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 0;

      .theme {
        left: -320px;
        bottom: -280px;
      }

      left: -40%;
      top: -35%;
    }

    .future {
      position: absolute;
      left: -2vw;
      top: 12vh;
      width: 21vw;
      height: 28vh;
      background-image: url(../../../assets/1.png);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      z-index: 901;
    }

    .solo {
      width: 65vw;
      height: 110vh;
      background-image: url(../../../assets/2.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 0;
      left: -75%;
      top: -36%;
    }

    .family {
      left: -180px;
      bottom: -300px;
    }

    .sleep {
      left: -240px;
      bottom: -210px;
    }

    .daytexts {
      position: absolute;
      width: 300px;
      top: 360px;
      left: 120px;
    }

    .solotexts {
      position: absolute;
      width: 100px;
      top: 340px;
      left: 260px;
    }

    .familytexts {
      position: absolute;
      width: 300px;
      top: 340px;
      left: 210px;
    }

    .themetexts {
      position: absolute;
      width: 250px;
      height: 87px;
      top: 130px;
      left: 130px;
    }

    .sleeptexts {
      position: absolute;
      width: 150px;
      top: 315px;
      left: 265px;
    }

    .theme_ZN {
      font-family: youshe;
      font-size: 18px;
      position: relative;
      margin-bottom: 6px;
      font-weight: lighter;

      &:before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: black;
        border-radius: 50%;
        margin-right: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -10px;
      }
    }

    .theme_EN {
      font-family: Nunito;
      font-size: 14px;
    }
  }

  .rocket {
    width: 120px;
    height: 100px;
    position: absolute;
    background-image: url(../../../assets/rocket.png);
    background-size: 100% 100%;
    z-index: 100;
    top: 10em;
    animation: rocket 5s linear infinite;
    cursor: pointer;
  }

  @keyframes rocket {
    0% {}

    13% {
      transform: translate(40em, 15em);
    }

    26% {
      transform: translate(0, 33em);
    }

    38% {
      transform: translate(-40em, 15em);
    }

    50% {
      transform: translate(0, 0);
    }

    61% {
      transform: translate(20em, 15em);
    }

    73% {
      transform: translate(0, 33em);
    }

    86% {
      transform: translate(-20em, 15em);
    }

    100% {
      transform: translate(0, 0);
    }
  }
}

.section3 {
  position: relative;
  background-color: #d7e9f4;
  height: 100vh;
  width: 100%;
  background-image: url(../../../assets/sec3back.png);
  background-position: center 150px;
  background-repeat: no-repeat;
  background-size: 90%;

  .background {
    position: relative;
    background-image: url(../../../assets/sec3map.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    width: 564px;
    height: 546px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 180px;
    margin: 0 auto;

    .titleThree {
      position: relative;
      top: -40px;

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 800;
        font-size: 4vw;
        font-family: youshe;
        font-weight: normal;
        top: 350px;
        left: 580px;
      }

      .content {
        position: relative;
        width: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2vw;
        font-family: Nunito;
      }
    }
  }
}

/* 第四部分样式 */
.section4 {
  position: relative;
  background-color: #e7f0f5;
  height: 100vh;
  z-index: 0;

  .could1 {
    height: 200px;
    width: 100%;
    top: 100px;
    background-image: url(../../../assets/clouds.8009636b.png) !important;
    background-repeat: no-repeat;
    background-size: 15%;
    background-position: right;
    animation: mover 30s linear infinite !important;
    position: absolute;
    animation-delay: 6s;
    z-index: -9;
  }

  .could2 {
    height: 200px;
    width: 100%;
    top: 500px;
    background-image: url(../../../assets/clouds.8009636b.png) !important;
    background-repeat: no-repeat;
    background-size: 15%;
    background-position: right;
    animation: mover 30s linear infinite !important;
    position: absolute;
    animation-delay: 6s;
    z-index: -9;
  }

  .could3 {
    height: 200px;
    width: 100%;
    top: 300px;
    background-image: url(../../../assets/clouds.8009636b.png) !important;
    background-repeat: no-repeat;
    background-size: 15%;
    background-position: right;
    animation: movel 30s linear infinite !important;
    position: absolute;
    animation-delay: 6s;
    z-index: -9;
  }

  .could4 {
    height: 200px;
    width: 100%;
    top: 100px;
    background-image: url(../../../assets/clouds.8009636b.png) !important;
    background-repeat: no-repeat;
    background-size: 15%;
    background-position: right;
    animation: mover 30s linear infinite !important;
    position: absolute;
    animation-delay: 6s;
    z-index: -1;
  }

  .could5 {
    height: 200px;
    width: 100%;
    top: 800px;
    background-image: url(../../../assets/clouds.8009636b.png) !important;
    background-repeat: no-repeat;
    background-size: 15%;
    background-position: right;
    animation: movel 30s linear infinite !important;
    position: absolute;
    animation-delay: 6s;
    z-index: -9;
  }

  @keyframes mover {
    0% {
      background-position: right;
    }

    100% {
      background-position: left;
    }
  }

  @keyframes movel {
    0% {
      background-position: left;
    }

    100% {
      background-position: right;
    }
  }

  .Pageforetitle {
    display: flex;
    padding-top: 120px;
    justify-content: center;
    align-items: center;
    font-size: 47px;
    font-family: youshe;
    font-weight: normal;
    background-color: transparent;
    position: relative;
    left: -20px;
  }

  .Pageforetitle::before {
    content: '';
    width: 430px;
    height: 200px;
    background-image: url(../../../assets/share.png);
    background-size: 110%;
    background-repeat: no-repeat;
    margin-right: -120px;
    margin-bottom: 30px;
  }

  .stable {
    color: #000000a6;
    display: flex;
    position: relative;
    flex-direction: column;
    left: 50%;
    transform: translate(-35%, -25%);
    text-align: left;
    width: 380px;

    .big {
      color: #000000a6;
      font-size: 38px;
      font-family: Nunito;
      color: #333;
      text-align: left;
      font-weight: lighter;
    }

    .small {
      color: #000000a6;
      font-size: 18px;
      font-family: Nunito;
      color: #333;
      margin-right: 10px;
      text-align: left;
    }

    .text {
      font-size: 18px;
      margin-left: 10px;
      text-align: left;
    }
  }

  //下载按钮样式
  .download {
    z-index: 99;
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
    }

    .wechat_download {
      width: 145px;
      height: 48px;
      background-color: #333;
      color: white;
      margin: 20px;
      border-radius: 18px;
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
}

//第五部分
.section5 {
  background-color: #e6e6e6;
  height: 75vh;
  position: relative;
  width: 100%;

  .Pagefivetitle {
    padding-top: 140px;
    display: flex;
    color: #1a1a1a;
    justify-content: center;
    align-items: center;
    font-size: 43px;
    font-family: youshe;
    font-style: normal;
    font-weight: lighter;

    div {
      margin: 30px;
    }
  }

  .Logos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    top: -10px;
    justify-content: space-around;
    align-items: center;
    width: auto;
    margin-left: 220px;
    margin-right: 220px;

    :nth-child(1) {
      width: 120px;
      height: 76.5px;
    }

    :nth-child(2) {
      width: 90px;
      height: 78.75px;
    }

    :nth-child(3) {
      width: 157.5px;
      height: 70.5px;
    }

    :nth-child(4) {
      width: 180px;
      height: 36.75px;
    }

    :nth-child(5) {
      width: 180px;
      height: 36.75px;
    }
  }
}

/* 跳转按钮样式 */
.jumpbutton {
  position: fixed;
  width: 6vh;
  height: 6vh;
  bottom: 6vh;
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

//底部
.footer {
  background-color: #4d4d4d;
  height: 237px;

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

.highlight {
  border-color: #dfefb4;
  color: #dfefb4;
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
}

/* 其他样式 */
.section2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  &>div {
    width: 30vw;
  }
}
</style>
