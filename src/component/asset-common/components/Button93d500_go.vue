<template>
  <div class="box" :style="gStyle()">
    <slot></slot>
    <div
      class="toast"
      :class="{ toggle: !auto, off: off }"
      :style="gDirect()"
      v-if="toast"
    >
      {{ toast }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';

const props = defineProps({
  setstyle: {
    type: String,
  },
  toast: {
    type: String,
  },
  right: {},
  auto: {
    type: Boolean,
    default: false,
  },
  off: {
    type: Boolean,
    default: false,
  },
});

const gStyle = () => {
  return props.setstyle ? this.setstyle : "";
}

const gDirect = () => {
  if (props.right) {
    return "right:0;left:auto";
  }
}
</script>

<style scoped>
div.box {
  display: inline-block;
  position: relative;
  background: #93d500;
  transition: background 0.5s ease;
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
  min-width: 160px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  /* border: 1px solid #b3b3b3; */
  /* box-shadow: 1px 1px 1px 0 #ddd,2px 2px 4px 0 rgba(242, 242, 242, 0.77); */
}
.toast {
  position: absolute;
  box-sizing: border-box;
  padding: 1em 1.5em;
  border: 1px solid #aaa;
  border-radius: 5px;
  width: 300px;
  font-size: 0.7em;
  height: min-content;
  line-height: 1.2;
  color: #4d4d4d;
  transform: translate(0, -50%);
  left: 0;
  top: -100%;
  background: rgba(255, 255, 255, 1);
  text-align: left;
}
.toggle {
  display: none;
}
div.box:hover {
  background: #a4dc29;
}
div.box:hover .toggle {
  display: block;
}
.off {
  display: none !important;
}
</style>
