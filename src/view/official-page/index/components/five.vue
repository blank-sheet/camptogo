<template>
  <section :style="gSection" class="hp-slide night">
    <div :class="{ mobilePitch: isPhone }">
      <div class="partner-title">
        <h1 :class="fadeIn" :style="transform">有品质</h1>
        <h1 :class="fadeIn" :style="transform">有态度</h1>
        <h1 :class="fadeIn" :style="transform">有温度</h1>
      </div>
      <div class="six window-w" :style="{ width: '70vw' }">
        <div
          class="white-tile"
          v-for="[x, y, classindex] in sixImgData"
          :key="classindex"
          :class="'wt' + classindex"
          :style="gSize(x * ipx, y * ipx)"
        ></div>
      </div>
      <div class="six mobile-w">
        <div
          class="white-tile"
          v-for="[, , classindex] in sixImgData"
          :key="classindex"
          :class="'wt' + classindex"
        ></div>
      </div>
      <div class="code-wrapper">
        <!-- <div class="shouldKnow">
        登录即视为您已同意ss
        <a :href="gHerf('/agreements.html/service')">营探用户协议</a>、<a
          :href="gHerf('/agreements.html/privacy')"
          >营探隐私政策</a
        >、<a>风险知情书</a>
      </div> -->
        <common-button24277 style="margin-right: 1.8em" @click="login">登录工作台</common-button24277>
        <common-button93d500 @click="goto">招商平台</common-button93d500>
      </div>

      <div class="bottom-frog"></div>
    </div>

    <!-- 引入 -->

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
                src="../../../../assets/regis.ef881569.png"
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
              src="../../../../assets/regis.ef881569.png"
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
                src="../../../../assets/regis.ef881569.png"
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
              src="../../../../assets/regis.ef881569.png"
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
  </section>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import QRCode from "../components/Code.vue";
import { gSize } from "../../../../utils/gStyle";
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  isPhone: Boolean,
  fadeIn: String,
  wpx: Number,
  ipx: Number,
  hpx: Number,
  transform: Object,
});

const origin = ref(location.origin);
const sixImgData = ref([
  [160, 102, 6],
  [120, 105, 2],
  [210, 94, 5],
  // [240, 49, 4],
  [240, 49, 7],
  // [240, 52, 3],
  // 云账户的图片信息 保留
  [240, 49, 1],
])

const gHerf = (path) => origin.value + path;
const goto = () => {
  // location.href = `${origin.value}/dynamic.html/investment`;
  router.push('./merchant')
};
const login = () => {
  // location.href = `${origin.value}/internal.html/tools/login`;
  router.push('./login')
};
</script>

<style>
.footer p:hover,
.footer a:hover {
  color: #93d500 !important;
}
.footer p,
.footer a {
  cursor: pointer;
}
.code-wrapper {
  /* width: 100vw !important; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  /* padding: 0 calc((100vw - 400px) / 2) !important; */
  padding: 30px 20px 20px 20px !important;
}
div.six.window-w {
  /* align-items: flex-start; */
  height: auto;
  /* margin-top:5vh; */
}
.mobilePitch {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 60vh;
}
.windowSpecial.xboxText {
  font-size: 1em !important;
}
.windowSpecial.xbox {
  padding-right: 3em;
}
div.bot-wrapper div {
  margin-top: 0;
}
.bot-wrapper .agreements {
  margin-bottom: 1em !important;
  padding-top: 1em !important;
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
  background-image: url(../../../../assets/qrCode1.png) !important;
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
</style>
