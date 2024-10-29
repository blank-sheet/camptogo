<template>
  <div id="home2">
    <div class="header" ref="header">
      <div class="yingtan">
        <img class="yingtanimg" src="../../../assets/white-yintan.png" alt="" />
      </div>
      <div class="header-upper">
        <div class="routerTest"></div>
      </div>
      <div class="header-lower"></div>
    </div>
    <!-- 合并五个滚动按钮  -->
    <button
      class="bt-down"
      :class="{ 'bt-up': nextSectionIndex === 0, cloudAbove: isAboveCloud }"
      @click="scrollToNextSection()"
    ></button>
    <div v-if="!isPhone" class="cloudBg" :style="cloudStyle"></div>
    <!-- 五个页面,若页面很多时可考虑虚拟列表原理优化 -->
    <PageOne
      :isPhone="isPhone"
      :fadeIn="gFadeIn(0)"
      v-bind="reactiveState"
      :cloudStyle="cloudStyle"
    />
    <PageTwo
      :isPhone="isPhone"
      v-bind="reactiveState"
      :fadeIn="gFadeIn(1)"
      :transform="gTransform(1)"
      :scrollTop="scrollTop"
      :cloudStyle="cloudStyle"
      :cloudTop="cloudTop"
    />
    <PageThree
      :isPhone="isPhone"
      v-bind="reactiveState"
      :fadeIn="gFadeIn(2)"
      :transform="gTransform(2)"
    />
    <PageFour
      :fadeIn="gFadeIn(3)"
      :transform="gTransform(3)"
      v-bind="reactiveState"
      :isPhone="isPhone"
    />
    <PageFive
      v-bind="reactiveState"
      :fadeIn="gFadeIn(4)"
      :isPhone="isPhone"
      :transform="gTransform(4)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router'
import WordCircleVue from './components/CircleWords/index.vue'
import { gReactiveImgAnimation, gSizeAndP, gSize } from "../../../utils/gStyle"
import { ideaScreen } from "../../../utils/ideaScreen"

import PageOne from "./components/new-One.vue";
import PageTwo from "./components/two.vue";
import PageThree from "./components/newThree.vue";
import PageFour from "./components/four.vue";
import PageFive from "./components/five.vue";

const config = {
  translateY: 70,
  windowActionPoints: [
    [25, 75],
    [25, 75],
    [40, 60],
    [40, 60],
    [40, 60],
  ],
  phoneActionPoints: [
    [30, 70],
    [30, 70],
    [40, 60],
    [40, 60],
    [40, 60],
  ],
}

const cloudPosition = ref(0);
const cloudMoveSpeed = 0.025;
const nextSectionIndex = ref(1);
const isPhone = ref(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
const screenH = ref(window.innerHeight);
const screenW = ref(window.innerWidth);
const currentFadeInPage = ref(0);
const scrollTop = ref(0);
const fadeState = ref(new Array(5).fill(0).map(() => new Set(["fadeIn-before", "fadeIn"])));
const transformState = ref(new Array(5).fill(0).map((_, i) => (i == 0 ? [0, 1] : [config.translateY, 0])));
const p2Opacity = ref(0);
const cloudTop = ref(1457);

const reactiveState = computed(() => {
  const device = isPhone.value ? "phone" : "window";
  const wpx = screenW.value / ideaScreen[device].width;
  const hpx = screenH.value / ideaScreen[device].height;
  return {
    wpx,
    hpx,
    ipx: Math.min(wpx, hpx),
  }
});

const isAboveCloud = computed(() => {
  return (
    scrollTop.value <=
    50 +
      (isPhone.value ? 463 : 402) * reactiveState.value.ipx -
      (ideaScreen[isPhone.value ? "phone" : "window"].height -
        (isPhone.value ? 1457 : 840)) *
        reactiveState.value.hpx
  )
})

const cloudStyle = computed(() => {
  return isPhone.value
    ? {
      ...gSizeAndP(
        (7633 / 2) * reactiveState.value.ipx,
        463 * reactiveState.value.ipx,
        0 * reactiveState.value.wpx,
        cloudTop.value * reactiveState.value.hpx
      ),
      "background-position": `${-cloudPosition.value}% 0`,
    }
    : {
      ...gSizeAndP(
        (7633 / 2) * reactiveState.value.ipx,
        402 * reactiveState.value.ipx,
        0 * reactiveState.value.wpx,
        840 * reactiveState.value.hpx
      ),
      "background-position": `${-cloudPosition.value}% 0`,
    }
})

const gFadeIn = (i) => {
  return i == 0 || i == 6 ? [...fadeState.value[i]].join(" ") : "transition02s"
}

const len = computed(() => document.querySelectorAll("section").length)

const cloudMove = () => {
  if (cloudPosition.value <= -100) {
    cloudPosition.value = 0
  }
  cloudPosition.value -= cloudMoveSpeed
  window.requestAnimationFrame(cloudMove)
}

const getPage = () => {
  const scrollHeight = scrollTop.value
  const screen = window.innerHeight
  if (scrollHeight < 0.95 * screen) {
    return 0
  } else if (scrollHeight > (isPhone.value ? 3.05 : 3.01) * screen) {
    return 4
  } else {
    return -1
  }
}

const gOpacity = (opacity) => {
  return { opacity }
}

const gTransform = (i) => {
  const [translateY, opacity] = transformState.value[i];
  return { transform: `translate3d(0,${translateY}px,0)`, opacity }
}

const transformSplice = (page, ...newArrayItems) => {
  const num = page < getLen() - 1 ? 2 : 1
  transformState.value.splice(page, num, ...newArrayItems.slice(0, num))
}

const updateTransform = (page, scrollTop) => {
  const [up, down] =
    config[isPhone.value ? "phoneActionPoints" : "windowActionPoints"][page]
  const { translateY } = config
  if (scrollTop < (up / 100) * window.innerHeight) {
    transformSplice(page, [0, 1], [translateY, 0])
  } else if (scrollTop > (down / 100) * window.innerHeight) {
    transformSplice(page, [translateY, 0], [0, 1])
  } else {
    transformSplice(page, [0, 1], [0, 1])
  }
}

const getLen = () => {
  return document.querySelectorAll("section").length
}

const scrollToNextSection = () => {
  const sections = document.querySelectorAll("section")
  sections[nextSectionIndex.value].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  })
  nextSectionIndex.value = (nextSectionIndex.value + 1) % sections.length
}

const scrollListener = (e) => {
  const scrollTopNum =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.scrollY;
  scrollTop.value = scrollTopNum;
  const maxScrollHeight = document.body.scrollHeight;
  let points = new Array(len.value).fill(0).map((r, i) => ({
    point: (1 / len.value) * i - 0.01,
    nextSectionIndexNum: (i + 1) % len.value,
  }));
  for (let i = len.value - 1; i >= 0; i--) {
    const { point, nextSectionIndexNum } = points[i];
    if (scrollTopNum >= point * maxScrollHeight) {
      nextSectionIndex.value = nextSectionIndexNum;
      break;
    }
  }
  currentFadeInPage.value = getPage();
  const pageScrollTop = scrollTopNum % window.innerHeight;
  const page = (scrollTopNum - pageScrollTop) / window.innerHeight;
  updateTransform(page, pageScrollTop);
  if (currentFadeInPage.value == -1) {
    const set1 = fadeState.value[0];
    const set4 = fadeState.value[4];
    set1.delete("fadeIn");
    set4.delete("fadeIn");
  } else {
    const set = fadeState.value[currentFadeInPage.value];
    set.add("fadeIn");
  }
}

onMounted(() => {
  window.requestAnimationFrame(cloudMove);
  window.addEventListener("scroll", scrollListener);
  window.addEventListener("resize", () => {
    if (!isPhone.value) {
      screenH.value = window.innerHeight;
      screenW.value = window.innerWidth;
    }
    isPhone.value = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  })
})

onUnmounted(() => {
  window.removeEventListener("scroll", scrollListener)
  window.removeEventListener("resize", () => {})
})

watch(scrollTop, () => {
  if (scrollTop.value <= 5) {
    transformState.value = new Array(5).fill(0).map((r, i) => (i == 0 ? [0, 1] : [config.translateY, 0]));
  }
})

</script>

<style lang="scss">
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
.header {
  z-index: 10001 !important;
}
</style>
