<template>
  <section
    :style="gSection"
    class="hp-slide plane planeMobileCloudPatch clearfix"
  >
    <div
      v-for="[
        width,
        height,
        x,
        y,
        index,
        titleZH,
        titleEN,
        popTitle,
        popContent,
      ] in renderCampImg(isPhone)"
      :key="index"
      :class="'uniCampBox'"
      :style="gSizeAndP(width * ipx, height * ipx, x * wpx, y * hpx)"
      @click="popUpClick(index)"
    >
      <div
        :class="'uniCamp p2camp' + index"
        :style="
          currentPopup == index && index != 1 ? { transform: 'scale(1.1)' } : {}
        "
      ></div>
      <!-- [w1,h1,x1,y1], -->
      <!-- [w2,h2,x2,y2] -->
      <!-- :style="isPhone?gMsizeAndP(w2*wpx,h2*hpx,x2*wpx,y2*hpx):{}" -->
      <div class="p2subtitlebox" :class="'p2sub' + index">
        <p :class="fadeIn" :style="transform">{{ titleZH }}</p>
        <p :class="fadeIn" :style="transform">{{ titleEN }}</p>
      </div>
      <!-- 这部分可能存在一个问题popup和小标题重合  所以应该用相对布局好一些 但是蓝湖目前获取不到小标题和popup的位置信息(别的什么布局问题知道这个之后也能解决) 暂时先用绝对布局 -->
      <!-- :style="isPhone?gMsizeAndP(w1*wpx,h1*hpx,x1*wpx,y1*hpx):{}" -->
      <div
        v-if="currentPopup == index || !isPhone"
        class="uniP2popup"
        :class="'p2popup' + index"
        :style="
          isPhone
            ? {
                opacity: 1,
                animation:
                  index != 1
                    ? `fadeInLeftMobile${
                        haveProperityLeft.includes(index) ? '0' : '1'
                      } 1s cubic-bezier(.41,.41,.01,1.5) 1 forwards`
                    : 'none',
              }
            : {}
        "
        @click.stop="popUpClick(-1)"
      >
        <p>{{ popTitle }}</p>
        <p>{{ popContent }}</p>
      </div>
    </div>
    <div class="p2rocket" :style="rocketStyle" @click="speedUp"></div>
    <div class="page2titlebox">
      <h1 class="pagetitle page2title" :class="fadeIn" :style="transform">
        探你所寻!
      </h1>
      <p :class="fadeIn" :style="transform">The Future Is Now!</p>
    </div>
    <div v-if="isPhone" class="cloudBg" :style="pageSpecialCloudStyle"></div>
  </section>
</template>

<script setup>
import { renderCampImg } from "../renderData/two.js";
import { gSize, gSizeAndP } from "../../../../utils/gStyle";
import { ideaScreen } from "../../../../utils/ideaScreen";
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isPhone: Boolean,
  fadeIn: String,
  wpx: Number,
  ipx: Number,
  hpx: Number,
  cloudStyle: Object,
  transform: Object,
  scrollTop: Number,
  cloudTop: Number
});

const currentPopup = ref(-1);
const haveProperityLeft = ref([0, 4, 5]);
const phoneRocket = ref([169, 1400, 71.5, ideaScreen["phone"].width / 2, ideaScreen["phone"].height / 2]);
const windowRocket = ref([695, 853, 77, ideaScreen["window"].width / 2, ideaScreen["window"].height / 2]);
const done = ref([]);
const angle = ref(180);
const path = ref([]);
const angleSpeed = ref(180 / Math.PI / 100);
const originSpeed = ref(180 / Math.PI / 100);
const index = ref(0);
const animateId = ref(0);
const speeduping = ref(false);
const timerId = ref(0);

const gSection = computed(() => `height:${window.innerHeight}px`);
const pageSpecialCloudStyle = computed(() => {
  return {
    ...props.cloudStyle,
    top: (props.cloudTop - ideaScreen["phone"].height) * props.hpx + "px",
  };
});
const p = computed(() => props.isPhone ? 740 : -69.5);
const locus0a = computed(() => props.isPhone ? 400 : 0);
const locus0b = computed(() => props.isPhone ? 400 : -350);
const locus0r = computed(() => props.isPhone ? 400 : 350);
const locus1a = computed(() => props.isPhone ? 420 : 850);
const locus1b = computed(() => props.isPhone ? 750 : 350);
const origin = computed(() => {
  return props.isPhone
    ? { x: phoneRocket.value[0], y: -phoneRocket.value[1] + phoneRocket.value[4] }
    : { x: windowRocket.value[0], y: -windowRocket.value[1] + windowRocket.value[4] };
});
const INCREASEMENT = computed(() => angleSpeed.value * 10);
const transformedAngle = computed(() => (angle.value / 180) * Math.PI);
const device = computed(() => props.isPhone ? phoneRocket.value : windowRocket.value);
const rocketSize = computed(() => gSize(150 * props.ipx, 130 * props.ipx));
const rocketStyle = computed(() => {
  const positionAndAngle = device.value;
  return {
    ...rocketSize.value,
    transform: `rotate(${positionAndAngle[2]}deg) translate3d(0,0,0)`,
    top: `${positionAndAngle[1] * props.hpx}px`,
    left: `${positionAndAngle[0] * props.wpx}px`,
  };
});

const speedUp = () => {
  // 0.2s左右的速度衰减
  if (speeduping.value) {
    return;
  } else {
    speeduping.value = true;
    angleSpeed.value *= 10;
    let i = 0.5;
    timerId.value = setInterval(() => {
      if (angleSpeed.value > originSpeed.value) {
        angleSpeed.value -= i * originSpeed.value;
      } else {
        clearInterval(timerId.value);
        speeduping.value = false;
      }
    }, 32);
  }
}
    
const transformYCoordinate = (topOrY, x, getPoint) => {
  if (props.isPhone) {
    return -topOrY + device.value[4];
  } else {
    if (getPoint) {
      return {
        X: x - device.value[3],
        Y: 200 - topOrY,
      };
    } else if (typeof x == "number") {
      return {
        X: x + device.value[3],
        Y: 200 - topOrY,
      };
    } else {
      return 200 - topOrY;
    }
  }
}

const getAngleFromatan = (arctan) => {
  return (Math.atan(arctan) * 180) / Math.PI;
}

const getRocketDirectionFromTangent = (tan, direction = 1) => {
  if (tan < 0) tan += 180;
  return (180 - direction * tan) % 360;
}

const up = (point) => {
  return (
    INCREASEMENT.value /
      (props.isPhone
        ? 1.5
        : 1.5 / (0.5 + Math.abs(point / device.value[4])) ** 2) +
    point
  );
}

const down = (point) => {
  return point - INCREASEMENT.value;
}

const move = (point, up) => {
  if (up) return up(point);
  return down(point);
}
    
const locusStart = (y) => {
  // 竖直向上抛物线运动至0,900
  const pointY = up(transformYCoordinate(y));
  const pointX = pointY ** 2 / 2 / p.value;
  const pointAngle = getRocketDirectionFromTangent(
    getAngleFromatan(p.value / pointY)
  );
  updateDevice(pointX, transformYCoordinate(pointY), pointAngle);
}

const locusStartWindow = (y) => {
  const pointY = up(transformYCoordinate(y));
  const pointX = -Math.sqrt(2 * p.value * pointY) || 0;
  const pointAngle = getRocketDirectionFromTangent(
    getAngleFromatan(pointX / p.value)
  );
  const { X, Y } = transformYCoordinate(pointY, pointX);
  updateDevice(X, Y, pointAngle);
}

const locus0 = () => {
  // 圆周运动至
  angle.value -= angleSpeed.value;
  const pointX =
    locus0a.value + Math.cos(transformedAngle.value) * locus0r.value;
  const pointY = locus0r.value * Math.sin(transformedAngle.value);
  const angle1 =
    getRocketDirectionFromTangent(
      getAngleFromatan((locus0a.value - pointX) / pointY)
    ) - (pointX > locus0a.value ? 180 : 0);
  updateDevice(pointX, transformYCoordinate(pointY), 1);
}

const locus0Window = () => {
  // 圆周运动至
  angle.value -= angleSpeed.value;
  const pointX =
    locus0a.value + Math.cos(transformedAngle.value) * locus0r.value;
  const pointY =
    locus0b.value + locus0r.value * Math.sin(transformedAngle.value);
  const angle1 =
    getRocketDirectionFromTangent(
      getAngleFromatan(pointX / (locus0b.value - pointY))
    ) - (pointX > locus0a.value ? 180 : 0);
  const { X, Y } = transformYCoordinate(pointY, pointX);
  updateDevice(X, Y, angle1);
}

const locus1 = () => {
  // 椭圆周运动
  angle.value -= angleSpeed.value / 1.5;
  const pointX =
    locus1a.value + locus1a.value * Math.cos(transformedAngle.value);
  const pointY = locus1b.value * Math.sin(transformedAngle.value);
  const angle1 =
    getRocketDirectionFromTangent(
      getAngleFromatan(
        ((locus1a.value - pointX) * locus1b.value ** 2) /
          (locus1a.value ** 2 * pointY)
      )
    ) - (pointX > locus1a.value ? 180 : 0);
  updateDevice(pointX, transformYCoordinate(pointY), angle1);
}

const locus1Window = () => {
  // 椭圆周运动
  angle.value -= angleSpeed.value / 2;
  const pointX = locus1a.value * Math.cos(transformedAngle.value);
  const pointY =
    locus1b.value * Math.sin(transformedAngle.value) - locus1b.value;
  const angle1 =
    getRocketDirectionFromTangent(
      getAngleFromatan(
        (pointX * locus1b.value ** 2) /
          ((-locus1b.value - pointY) * locus1a.value ** 2)
      )
    ) - (pointX > 0 ? 180 : 0);
  const { X, Y } = transformYCoordinate(pointY, pointX);
  updateDevice(X, Y, angle1);
}

const locus2 = (x, y) => {
  // 直线运动
  const pointY = y + INCREASEMENT.value;
  updateDevice(x, pointY);
}

const locusBackToOrigin = () => {
  // 内切圆运动
  //   待修改
  angle.value += angleSpeed.value * 1.25;
  const sqrt3 = Math.sqrt(3);
  const crossX = locus1a.value * 2;
  const crossY = ((crossX - origin.value.x) * sqrt3) / 3 + origin.value.y;
  const s = Math.sqrt(
    (crossX - origin.value.x) ** 2 + (crossY - origin.value.y) ** 2
  );
  const r = (s * sqrt3) / (2 + sqrt3);
  const Ox = crossX - r;
  const Oy = -((sqrt3 / 3) * (Ox - origin.value.x) + origin.value.y);
  const pointX = Ox + r * Math.cos(transformedAngle.value);
  const pointY = Oy + r * Math.sin(transformedAngle.value);
  const angle1 =
    getRocketDirectionFromTangent(
      getAngleFromatan((Ox - pointX) / (Oy - pointY))
    ) - (pointX > Ox ? 180 : 0);
  updateDevice(pointX, pointY + device.value[4], angle1);
}

const updateDevice = (...splice) => {
  device.value.splice(0, splice.length, ...splice);
}
    
const updateRocket = () => {
  let [x, y, halfWidth, halfHeight] = device.value;
  if (props.isPhone) {
    //   phone
    if (!done.value.includes(0)) {
      locusStart(y);
      if (y <= device.value[4] + 2) {
        done.value.push(0);
      }
    } else if (!done.value.includes(1)) {
      locus0();
      if (angle.value <= -180) {
        done.value.push(1);
      }
    } else if (!done.value.includes(2)) {
      locus1();
      if (angle.value < -540) {
        angle.value = 180;
        done.value.splice(1, done.value.length - 1);
      }
    }
  } else {
    //   window
    if (!done.value.includes(0)) {
      locusStartWindow(y);
      if (y <= 200) {
        done.value.push(0);
      }
    } else if (!done.value.includes(1)) {
      locus0Window();
      if (angle.value <= -270) {
        done.value.push(1);
      }
    } else if (!done.value.includes(2)) {
      locus1Window();
      if (angle.value <= -630) {
        angle.value = 90;
        done.value.splice(1, done.value.length - 1);
      }
    }
  }
  animateId.value = window.requestAnimationFrame(updateRocket);
}

onMounted(() => {
  if (!props.isPhone) {
    angle.value = 90;
  }
  window.cancelAnimationFrame(animateId.value);
  animateId.value = window.requestAnimationFrame(updateRocket);
});

onUnmounted(() => {
  window.cancelAnimationFrame(animateId.value);
});

const popUpClick = (i) => {
  currentPopup.value = i;
}
</script>

<style></style>
