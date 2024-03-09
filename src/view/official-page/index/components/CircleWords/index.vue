<template>
  <div class="circle">
    <Three v-bind="reactive" :fadeIn="gFadeIn(2)" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Three from './Three.vue'
const ideaScreen = {
  window: { width: 1920, height: 1080 },
  phone: { width: 1000, height: 1800 }
}
const reactive = computed(() => {
  const device = 'window'
  const wpx = window.innerWidth / ideaScreen[device].width
  const hpx = window.innerHeight / ideaScreen[device].height
  return {
    wpx,
    hpx,
    ipx: Math.min(wpx, hpx)
  }
})
const fadeState = new Array(5).fill(0).map((r, i) => new Set(['fadeIn-before', 'fadeIn']))
function gFadeIn() {
  return i => (i == 0 || i == 6 ? [...this.fadeState[i]].join(' ') : 'transition02s')
}
function gTransform(i) {
  const [translateY, opacity] = this.transformState[i]
  return { transform: `translate3d(0,${translateY}px,0)`, opacity }
}
</script>

<style lang="scss">
.circle {
  position: absolute;
  top: 450px;
  left: 50%;
  transform: translate(-50%);
  z-index: 999;
}
</style>
