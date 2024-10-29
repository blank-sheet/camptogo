<template>
  <section :style="gSection" class="hp-slide travel">
    <!-- <div class="backClouds cloud5"></div>
      <div class="backClouds cloud6"></div>
      <div class="backClouds cloud7"></div>
      <div class="backClouds cloud8"></div>
      <div class="backClouds cloud9"></div> -->
    <div
      class="backClouds"
      v-for="(item, i) in clouds.flat()"
      :key="i"
      :style="cloudStyle(gPosition(item))"
    ></div>
    <div class="sec3Title sec4Title">
      <h2 id="er" :style="transform" :class="fadeIn">营探标准</h2>
    </div>

    <div class="features">
      <p align="left">
        <span><span class="feaCap">S</span>afe</span>
        <span class="fecPlaceHolder"></span>
        人身安全&nbsp;&nbsp;资金安全&nbsp;&nbsp;信息安全
      </p>
      <p align="left">
        <span><span class="feaCap">H</span>igh</span>
        <span class="fecPlaceHolder"></span>
        高资质团队&nbsp;&nbsp;高质量教育&nbsp;&nbsp;高标准服务
      </p>
      <p align="left">
        <span><span class="feaCap">A</span>ll&nbsp;&nbsp;&nbsp;</span>
        <span class="fecPlaceHolder"></span>
        All Day&nbsp;&nbsp;All Seasons&nbsp;&nbsp;All Types
      </p>
      <p align="left">
        <span><span class="feaCap">R</span>ich</span>
        <span class="fecPlaceHolder"></span>
        丰富主题&nbsp;&nbsp;海量活动&nbsp;&nbsp;多维展示
      </p>
      <p align="left">
        <span><span class="feaCap">E</span>asy</span>
        <span class="fecPlaceHolder"></span>
        多端覆盖&nbsp;&nbsp;高级检索&nbsp;&nbsp;一站预订
      </p>
    </div>
    <div class="codeContainer">
      <!-- <QRCode :isPhone="isPhone" /> -->
      <common-code :isPhone="isPhone"></common-code>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineProps, computed } from 'vue';
import { ideaScreen } from "../../../../utils/ideaScreen";
import QRCode from "./Code.vue";
const speed = [4, -2, 3].map((r) => r / 60);

const props = defineProps({
  isPhone: Boolean,
  fadeIn: String,
  wpx: Number,
  ipx: Number,
  hpx: Number,
  transform: Object,
});

const clouds = ref([
  [
    [15, 25],
    [68, 28],
    [130, 30],
  ],
  [
    [60, 50],
    [160, 53],
  ],
  [
    [10, 75],
    [65, 73],
    [130, 79],
  ],
])
const animateId = ref(0)

const cloudStyle = computed(() => (size) => ({
  width: (801 * props.ipx) / 3 + "px",
  height: (501 * props.ipx) / 3 + "px",
  ...size,
}))

const gSection = computed(() => `height:${window.innerHeight}px`);

const uniSpeed = (originSpeed) => {
  return props.isPhone ? originSpeed * 1.3 : originSpeed;
}

const gPosition = ([x, y]) => {
  const device = props.isPhone ? "phone" : "window";
  props.isPhone && (y -= 5);
  return {
    left: ((props.wpx * x) / 100) * ideaScreen[device].width + "px",
    top: ((props.hpx * y) / 100) * ideaScreen[device].height + "px",
    display: x > 105 || x < -50 ? "none" : "block",
  };
}

const updatePosition = () => {
  clouds.value.forEach((r, i) => {
    r.forEach((v) => {
      let x = v.shift();
      x += uniSpeed(speed[i]);
      if (i != 1 && x > 150) {
        x = -50;
      } else if (i == 1 && x < -50) {
        x = 150;
      }
      v.unshift(x);
    });
  });
  animateId.value = window.requestAnimationFrame(updatePosition);
}

onMounted(() => {
  window.cancelAnimationFrame(animateId.value);
  animateId.value = window.requestAnimationFrame(updatePosition);
})

onUnmounted(() => {
  window.cancelAnimationFrame(animateId.value);
})
</script>

<style>
.codeContainer {
  width: min-content;
  height: min-content;
  position: absolute;
  min-height: 20vh;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
}
common-code {
  margin: auto;
}
.features {
  margin-bottom: 10px !important;
}
@media only screen and (max-height: 1080px) and (min-width: 40.063em) {
  .sec3Title {
    transform: scale(0.8);
    transform-origin: top;
  }
  .features {
    transform: scale(0.7) translateY(-20vh) !important;
  }
}
</style>
