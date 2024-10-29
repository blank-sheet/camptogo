<template>
  <div :style="gStyle()">
    <slot></slot>
    <div class="logo" v-if="logo" :style="gLogo()"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';

const props = defineProps({
  setstyle: {
    type: String,
  },
  logo: {
    type: Object,
  }
});

const gStyle = () => {
  return props.setstyle ? props.setstyle : "";
}

const gLogo = () => {
  return props.logo
    ? `background:${props.logo.color};width:${props.logo.size}px;height:${props.logo.size}px`
    : "";
}
</script>

<style scoped>
div {
  display: inline-block;
  /* background: rgba(252, 252, 252, 0.77); */
  background-color: #fff;
  transition: background 0.5s ease;
  /* color: #333; */
  color: #93d500;
  border-radius: 10px;
  font-size: 1.2rem;
  position: relative;
  min-width: 160px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #b3b3b3;
  /* box-shadow: 1px 1px 1px 0 #ddd,2px 2px 4px 0 rgba(242, 242, 242, 0.77); */
  /* box-shadow: 0 0 3vh #91d500dc; */
}
div:hover {
  background: rgba(242, 242, 242, 0.77);
}
.logo {
  position: absolute;
  top: 0;
  min-width: 0;
  right: 0;
  border-radius: 50%;
  transform: translate(50%, -50%);
}
</style>
