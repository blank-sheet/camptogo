<template>
  <section
    :style="gSection"
    class="hp-slide day clearfix hp-slide-3"
    style="postion: relative"
  >
    <div class="map" :style="mapSize">
      <div class="wordCloud">
        <transition v-for="({ text }, i) of renderData" :key="i" name="fade1">
          <span
            class="wordCloudTag"
            :style="{
              color: color[i % color.length],
              ...renderContentEle[i].style,
            }"
            v-if="!renderContentEle[i].hide"
            >{{ text }}</span
          >
        </transition>
      </div>
      <img src="../../../../assets/sec3map.png" :style="imgSize" alt="" />
      <div class="sec3Title w-s3t">
        <h1 align="center" id="ew" :style="transform" :class="fadeIn">
          营你所爱!
        </h1>
        <h2
          align="center"
          class="page3engtitle"
          :style="transform"
          :class="fadeIn"
        >
          Good things come to those who camp!
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineProps, computed } from 'vue';
import { gSizeAndP, gSize } from "../../../../utils/gStyle";
import { viWords, normalWords } from "../renderData/newThree";

const wordWithTag = [];
const point = 0;
// 卡上下词的位置
normalWords.slice(0, point).forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: i,
    show: false,
    vip: false,
  });
});
viWords.forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: point + i,
    show: false,
    vip: true,
  });
});
normalWords.slice(point).forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: i + point + viWords.length,
    show: false,
    vip: false,
  });
});

const props = defineProps({
  isPhone: Boolean,
  fadeIn: String,
  wpx: Number,
  ipx: Number,
  hpx: Number,
  transform: Object,
});

const data = ref(wordWithTag)
const color = ref(["#333333", "#487629", "#333333", "#93d500"])
const contentEle = ref(wordWithTag.map(() => ({
  x: 0,
  y: 0,
  z: 0,
  style: {},
})))
const direction = ref("-1")
const speed = ref(1000)
const animateId = ref(0)
const angle = ref(-0.003)
const space = ref(50)
const maxAlpha = ref(0.8)
const maxScale = ref(2.5)
const scale = ref({ x: 1.2, y: 1.1 })

const renderNum = computed(() => props.isPhone ? 50 : 60);
const gSection = computed(() => `height:${window.innerHeight}px`);
const renderData = computed(() => data.value.slice(0, renderNum.value));
const renderContentEle = computed(() => contentEle.value.slice(0, renderNum.value));
const width = computed(() => props.isPhone ? window.innerWidth * 0.9 : 1521 * props.ipx * scale.value.x);
const height = computed(() => props.isPhone ? window.innerHeight * 0.75 : 730 * props.ipx * scale.value.y);
const mapSize = computed(() => props.isPhone ? {} : {
  ...gSize(
    1521 * props.ipx * scale.value.x,
    730 * props.ipx * scale.value.y
  ),
  position: "relative",
  top: "50%",
  "margin-top": 0,
  transform: `translateY(-50%)`,
});
const imgSize = computed(() => props.isPhone ? {} : gSize(752 * props.ipx, props.ipx * 728));
const unVisibleR = computed(() => props.isPhone ? (window.innerWidth * 0.9 * 0.7) / 2 - 30 : (props.ipx * 640) / 2 - 30);
const perspective = computed(() => 1000 * Math.max(props.hpx, props.wpx));

const init = () => {
  window.cancelAnimationFrame(animateId.value);
  const RADIUSX = (width.value - 50) / 2;
  const RADIUSY = (height.value - 50) / 2;
  contentEle.value = [];
  for (let i = 0; i < renderData.value.length; i++) {
    data.value[i].show = true;
    const k = -1 + (2 * (i + 1) - 1) / renderData.value.length;
    const a = Math.acos(k);
    const b = a * Math.sqrt(renderData.value.length * Math.PI);
    const x = RADIUSX * Math.sin(a) * Math.cos(b);
    const y = RADIUSY * Math.sin(a) * Math.sin(b);
    const z = RADIUSX * Math.cos(a) * 0.9;
    const singleEle = {
      x,
      y,
      z,
      style: {},
    };
    contentEle.value.push(singleEle);
  }
  animate();
}
    
const shuffle = (pos) => {
  let i = pos.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [pos[j], pos[i]] = [pos[i], pos[j]];
  }
}

const animate = () => {
  rotateY();
  move();
  animateId.value = window.requestAnimationFrame(animate);
}

const rotateX = () => {
  const angleX = angle.value;
  const cos = Math.cos(angleX);
  const sin = Math.sin(angleX);
  contentEle.value = contentEle.value.map((t) => {
    const y1 = t.y * cos - t.z * sin;
    const z1 = t.z * cos + t.y * sin;
    return {
      ...t,
      y: y1,
      z: z1,
    };
  });
}

const shouldHide = (x, y, z) => {
  if (z > 0) return false;
  if (
    (x - width.value / 2) ** 2 + (y - height.value / 2) ** 2 <
    unVisibleR.value ** 2
  ) {
    return true;
  } else {
    return false;
  }
}

const rotateY = () => {
  const angleY = angle.value;
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  contentEle.value = contentEle.value.map((t, i) => {
    const x1 = t.x * cos - t.z * sin;
    const z1 = t.z * cos + t.x * sin;
    return {
      ...t,
      x: x1,
      z: z1,
    };
  });
}

const move = () => {
  const CX = width.value / 2;
  const CY = height.value / 2;
  contentEle.value = contentEle.value.map((singleEle, i) => {
    const { x, y, z } = singleEle;
    const RADIUS = (width.value - space.value) / 2;
    const scale = perspective.value / (perspective.value - z);
    const alpha = Math.min(
      ((z + RADIUS) / (2 * RADIUS)) ** (z < 0 ? 1.5 : 1.2),
      maxAlpha.value
    );
    const left = x + CX - space.value / 2;
    const top = y + CY - space.value / 2;
    const transform = `translate3d(${left}px, ${top}px,0) scale(${
      (props.isPhone ? 0.8 : 1) * Math.min(scale, maxScale.value).toFixed(2)
    })`;
    const hide = shouldHide(left, top, z);
    const style = {
      ...singleEle.style,
      opacity: isNaN(alpha) ? 0 : alpha,
      "z-index": hide ? -1 : 0,
      transform,
    };
    return {
      x,
      y,
      z,
      style,
      hide,
    };
  });
}

onMounted(() => {
  init();
})

onUnmounted(() => {
  window.cancelAnimationFrame(animateId.value);
})
</script>

<style>
.wordCloud {
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  perspective: 1000px;
}
.wordCloudTag {
  display: block;
  white-space: nowrap;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0;
  text-decoration: none;
  font-size: 0.8em;
  font-family: siyuan;
  font-weight: bold;
  transition: all 0.16s ease;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: 0.16s;
}
.fade1-enter,
.fade1-leave-to {
  opacity: 0;
}
</style>
