<template>
  <section
    :style="gSection"
    class="hp-slide homeSection clearfix"
    ref="home-section"
  >
    <div class="CampTitle" v-if="!isPhone">
      <h1 align="center" id="pageTitle" class="wideScreen" :class="fadeIn">
        营地奇遇&nbsp;&nbsp; 探手可得
      </h1>
      <div class="pEng wideScreen" align="center" :class="fadeIn">
        <!-- Adventure Camper Happier Future -->
        <!-- <p>营探，泛营地活动预订平台。</p> -->
        <p>
          游学&nbsp;&nbsp; | &nbsp;&nbsp;研学&nbsp;&nbsp; |
          &nbsp;&nbsp;冬夏令营&nbsp;&nbsp; | &nbsp;&nbsp;亲子活动&nbsp;&nbsp; |
          &nbsp;&nbsp;主题活动
        </p>
      </div>
    </div>
    <div class="mbenowrap">
      <h1 align="center" class="mobile page1title" :class="fadeIn">营地奇遇</h1>
      <div></div>
      <h1 align="center" class="mobile page1title" :class="fadeIn">探手可得</h1>
    </div>
    <div class="ppppp">
      <h2 class="mobile page1subtitle marginPitch" :class="fadeIn">
        游学&nbsp; | &nbsp;研学&nbsp; | &nbsp;冬夏令营&nbsp; |
        &nbsp;亲子活动&nbsp; | &nbsp;主题活动
      </h2>
    </div>
    <div v-if="isPhone" class="fill"></div>
    <div class="code-wrapper">
      <!-- <router-view /> -->
      <common-button24277 style="margin-right: 1.8em" @click="login">登录工作台</common-button24277>
      <common-button93d500 @click="goto">招商平台</common-button93d500>
      <!-- <QRCode :isPhone="isPhone" /> -->
    </div>
    <h2 class="mobile page1subtitle zzz www" :class="fadeIn">
      Adventure &nbsp;&nbsp;&nbsp;&nbsp;Camper
    </h2>
    <h2 class="mobile page1subtitle zzz" :class="fadeIn">
      Happier &nbsp;&nbsp;&nbsp;&nbsp;Future
    </h2>

    <!-- <div class="intervalHolder"></div> -->

    <!-- 底部图片 -->
    <div class="campus-image-fixed" ref="imgBox">
      <div
        class="campus-image-wrapper eggBg"
        :class="isPhone ? 'phoneEgg' : 'windowEgg'"
        :style="imgSize"
      ></div>
    </div>
    <div
      class="planetBg mousePointer"
      @click="hover('planet')"
      :class="gClassName('planet')"
      :style="planetstyle"
    ></div>
    <div class="planetBgPreLoad"></div>
    <div
      class="spacemanBg mousePointer"
      :style="spacemanStyle"
      @click="hover('spaceman')"
      :class="gClassName('spaceman')"
    ></div>
    <div class="starLight" :style="starLightStyle">
      <div class="starBg" :style="starStyle"></div>
    </div>
    <div
      class="flogBg mousePointer"
      @click="hover('flog')"
      :class="gClassName('flog')"
      :style="flogStyle"
    ></div>

    <div
      class="spaceBox mousePointer"
      @click="hover('space')"
      :style="spaceStyle"
    >
      <div class="spaceBg" :class="gClassName('space')"></div>
      <div
        class="lightBg mousePointer"
        :class="gClassName('spaceLight')"
        :style="lightStyle"
      ></div>
    </div>
    <div v-if="isPhone" class="cloudBg" :style="cloudStyle"></div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, computed } from 'vue';
import { gReactiveImgAnimation, gSizeAndP, gSize } from "../../../../utils/gStyle";
import QRCode from "./Code.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  isPhone: Boolean,
  fadeIn: String,
  wpx: Number,
  ipx: Number,
  hpx: Number,
  cloudStyle: Object
});

const phoneAnimationName = reactive({
  spaceman: new Set(),
  flog: new Set(),
  space: new Set(),
  planet: new Set(),
  spaceLight: new Set(),
})

const goto = () => {
  // location.href = `${origin.value}/dynamic.html/investment`;
  router.push('./merchant')
};
const login = () => {
  // location.href = `${origin.value}/internal.html/tools/login`;
  router.push('./login')
};

const gClassName = (key) => {
  return " " + [...phoneAnimationName[key]].join(" ");
};

const hover = (key) => {
  if (!props.isPhone) return;

  let set = phoneAnimationName[key];
  
  if (key === "space") {
    set = phoneAnimationName.spaceLight;
    if (set.has("spaceBoxlightBg")) {
      set.delete("spaceBoxlightBg");
    } else {
      set.add("spaceBoxlightBg");
    }
  } else if (key === "planet") {
    if (set.has("planet_0")) {
      set.delete("planet_0");
    } else {
      set.add("planet_0");
    }
  } else {
    if (set.size === 1) {
      set.add(`${key}_0`);
    } else if (set.size === 2) {
      set.delete(`${key}_0`);
    } else {
      set.add(`${key}_`);
    }
  }
};

const gSection = computed(() => `height:${window.innerHeight}px`);

const imgSize = computed(() => {
  return props.isPhone
    ? gSizeAndP(
        782 * props.ipx,
        130 * props.ipx,
        148 * props.wpx,
        1352 * props.hpx
      )
    : {
        height: window.innerHeight / 2 + "px",
        width: 1078 * props.wpx + "px",
      }
})

const starLightStyle = computed(() => {
  return props.isPhone
    ? gSizeAndP(
        291 * props.ipx,
        283 * props.ipx,
        356 * props.wpx,
        771 * props.hpx
      )
    : gSizeAndP(
        291 * props.ipx,
        283 * props.ipx,
        863 * props.wpx,
        467 * props.hpx
      )
})

const lightStyle = computed(() => gSize(142 * props.ipx, 180 * props.ipx));

const spaceStyle = computed(() => {
  return props.isPhone
    ? gSizeAndP(202 * props.ipx, 160 * props.ipx, 757 * props.wpx, 918 * props.hpx)
    : gSizeAndP(202 * props.ipx, 160 * props.ipx, 1221 * props.wpx, 523 * props.hpx);
});

const planetstyle = computed(() => {
  return props.isPhone
    ? gSizeAndP(182 * props.ipx, 130 * props.ipx, 98 * props.wpx, 933 * props.hpx)
    : gSizeAndP(182 * props.ipx, 130 * props.ipx, 506 * props.wpx, 599 * props.hpx);
});

const starStyle = computed(() => gSize(74 * props.ipx, 75 * props.ipx));

const flogStyle = computed(() => {
  return props.isPhone
    ? gSizeAndP(150 * props.ipx, 237 * props.ipx, 577 * props.wpx, 1040 * props.hpx)
    : gSizeAndP(150 * props.ipx, 237 * props.ipx, 995 * props.wpx, 668 * props.hpx);
})

const spacemanStyle = computed(() => {
  return props.isPhone
    ? gSizeAndP(307 * props.ipx, 452 * props.ipx, 254 * props.wpx, 953 * props.hpx)
    : gSizeAndP(314 * props.ipx, 445 * props.ipx, 672 * props.wpx, 581 * props.hpx);
})
</script>

<style lang="scss">
.pEng p {
  font-size: 2.8vw !important;
}
.ppppp {
  transform: translateY(150%);
  margin-top: 0 !important;
}
.zzz {
  font-size: 1.6em !important;
  line-height: 1.3 !important;
}
.www {
  margin-top: -1em !important;
}
.mousePointer {
  cursor: pointer;
}
.intervalHolder {
  height: 1em;
}
.flogBg {
  position: absolute;
  background-image: url(../../../../assets/page1/flog.png);
  background-size: 600% 100%;
  background-position: 0 0;
  z-index: 901;
}

.cloudBg {
  position: absolute;
  background-image: url(../../../../assets/page1/doublecloud.png);
  background-size: 200% 100%;
  background-position: 0 0;
  /* animation: cloud 10s ease infinite; */
  z-index: 900;
}
@keyframes cloud {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.spaceBg {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../../../assets/page1/space.png);
  background-size: 1400% 100%;
  background-position: 0 0;
  z-index: 901;
}
.spaceBox {
  position: absolute;
  z-index: 901;
}
.lightBg {
  background-image: url(../../../../assets/page1/light.png);
  background-size: auto 0%;
  background-position: center 0;
  transform-origin: right top;
  transform: translateX(10%) rotate(13deg);
  background-repeat: no-repeat;
  transition: background-size 0.2s cubic-bezier(0.78, 0.31, 0.92, 0.55),
    opacity 0.2s ease;
  opacity: 0;
  z-index: 900;
}
.starLight {
  position: absolute;
  display: flex;
  z-index: 902;
  background-image: url(../../../../assets/page1/starLight.png);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  animation: light 1s ease infinite;
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
@keyframes space0 {
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
@keyframes flog0 {
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
@keyframes spaceman0 {
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
.starBg {
  /* position: absolute; */
  margin: auto;
  background-image: url(../../../../assets/page1/star.png);
  background-size: 100% 100%;
}
.planetBg {
  position: absolute;
  background-image: url(../../../../assets/page1/planet.png);
  background-size: 100% 100%;
  z-index: 901;
}

.spacemanBg {
  position: absolute;
  background-image: url(../../../../assets/page1/people.png);
  background-size: 400% 100%;
  background-position: 0 0;
  z-index: 901;
  /* background-repeat: no-repeat; */
}

.eggBg {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
div.campus-image-fixed {
  z-index: 901;
}
.windowEgg {
  background-image: url(../../../../assets/page1/eggs.png);
}
.phoneEgg {
  position: absolute;
  z-index: 901;
  background-image: url(../../../../assets/page1/eggsphone.png);
}
.pEng > p:nth-child(1) {
  transform: scale(0.8);
}
.fill {
  height: 3%;
  width: 1%;
}
</style>
