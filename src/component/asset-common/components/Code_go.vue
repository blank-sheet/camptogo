<template>
  <div class="code-zone" :style="setstyle">
    <div
      class="code-item code-item-1"
      :class="isPhone ? '' : 'fakeCodeWindow'"
      @mouseenter="showRealCodeIOS"
      @mouseleave="hideRealCodeIOS"
      @click="iosSpecial"
    >
      <div class="fakeCode" style="background-color: gray">
        <img :src="iosLogo" alt="" />
        <p class="download">iPhone/iPad下载 ></p>
      </div>
      <transition name="fade">
        <div class="realCode" v-show="!isPhone || isShowIOS">
          <div
            :class="isPhone ? '' : 'animate001'"
            :style="animation(isShowIOS)"
          >
            <div>敬请期待</div>
            <!-- <p style="color: #000">扫码下载</p>
            <img :src="iosCode" alt="" /> -->
          </div>
        </div>
      </transition>
    </div>

    <div class="placeholder"></div>
    <div
      class="code-item code-item-2"
      :class="isPhone ? '' : 'fakeCodeWindow'"
      @mouseenter="showRealCodeWechat"
      @mouseleave="hideRealCodeWechat"
      @click="androidSpecial"
    >
      <div class="fakeCode">
        &nbsp;&nbsp;
        <img :src="weChatLogo" alt="" />
        <p class="download">&nbsp;&nbsp;Wechat小程序 ></p>
      </div>
      <transition name="fade">
        <div class="realCode" v-show="!isPhone || isShowWechat">
          <div
            :class="isPhone ? '' : 'animate001'"
            :style="animation(isShowWechat)"
          >
            <!-- <p style="color: #000">扫码进入</p> -->
            <img :src="weChatCode" alt="" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import iosLogo from "../../../assets/QRCode/ios600.png";
import iosCode from "../../../assets/QRCode/iosDownload.png";
import weChatLogo from "../../../assets/QRCode/wechat600.png";
import weChatCode from "../../../assets/QRCode/wechatP.jpg";
import { ref, computed, onMounted, defineProps, inject } from 'vue';

const props = defineProps({
  isPhone: Boolean,
  setstyle: [String, Object], // 假设 setstyle 可以是字符串或对象
});

// 定义组件的 emit
const emit = defineEmits(['update:setstyle']);

// 从父组件注入 isPhone 属性
const isPhone = inject('isPhone', false);

// 使用 ref 创建响应式状态
const isShowIOS = ref(false);
const isShowWechat = ref(false);

// 定义计算属性
const animation = (show) => {
  if (!props.isPhone) {
    return { transform: `scale(${show ? 1 : 0})` };
  }
  return {};
};

// 定义组件的方法
const iosSpecial = () => {
  if (!props.isPhone) return;
  window.location.href =
    "itms-apps://apple.com/us/app/%E8%90%A5%E6%8E%A2/id1575920559";
};

const androidSpecial = () => {
  if (!props.isPhone) return;
  isShowWechat.value = !isShowWechat.value;
};

const showRealCodeIOS = () => {
  if (props.isPhone) {
    return;
  }
  isShowIOS.value = true;
};

const hideRealCodeIOS = () => {
  if (!props.isPhone) {
    isShowIOS.value = false;
  }
};

const showRealCodeWechat = () => {
  if (props.isPhone) {
    return;
  }
  isShowWechat.value = true;
};

const hideRealCodeWechat = () => {
  isShowWechat.value = false;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.code-zone {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: min-content;
  box-sizing: border-box;
  transform: scale(0.75);
}
.placeholder {
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
}
.code-zone .code-item {
  /* width: 250px; */
  /* height: 100px; */
  text-align: center;
  margin-top: 30px;
}
.code-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.animate001 {
  transform-origin: bottom;
  transition: transform 0.5s ease;
}
.fakeCode {
  display: flex;
  flex-direction: columns;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  /* height: 60%; */
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 12px 10px;
}
.fakeCodeWindow:hover > .fakeCode {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}
.code-zone .code-item .fakeCode {
  /* margin-top: 30px; */
}
.code-zone .code-item .fakeCode img {
  margin: auto;
  width: 40px;
  height: 40px;
}
.code-zone .code-item .realCode {
  position: absolute;
  /* margin-top: -180px; */
  top: -1px;
  transform: translateY(-100%);
  /* margin-left: 10px; */
}
.code-zone .code-item .realCode img {
  width: 144px;
  height: 144px;
}
p {
  /* margin-left: 10px; */
}
.download {
  white-space: nowrap;
  /* min-width: 150px; */
}
img,
p {
  display: block;
  color: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 483px) {
  .code-zone {
    /* display: flex;

    justify-content: space-around;
    align-items: center;
    padding: 20px 0; */
  }
  .fakeCode {
    padding: 10px 10px;
  }
  .code-zone .code-item {
    flex-direction: row;
  }
  p {
    font-size: 12px;
    /* min-width: 120px; */
  }
  .code-zone .code-item .realCode {
    /* margin-top: -155px;
    margin-left: 10px; */
  }
  .code-zone .code-item {
    /* width: 190px; */
    height: auto;
  }
  .greenboxes {
    width: 20vw;
    /* height: ; */
  }
}
</style>
