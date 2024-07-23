<template>
  <div class="camp-tool-container" ref="campTool" @click="openClipper">
    <Crop class="campToolMain Crop"></Crop>
  </div>
  <camp-clipper :isVisible="cropperShow" @cancel="cropperShow = false"></camp-clipper>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Crop } from '@element-plus/icons-vue'
import CampClipper from './camp-clipper.vue'

const cropperShow = ref(false)
const campTool = ref(null)

const dragDirective = {
  mounted(el) {
    let isDragging = false;
    let disx, disy;
    let screenWidth = window.innerWidth;

    el.onmousedown = function (e) {
      isDragging = true;
      //拖拽标记还原
      el.dragFlag = false;
      disx = e.pageX - el.offsetLeft;
      disy = e.pageY - el.offsetTop;

      document.onmousemove = function (e) {
        //设置拖拽标记
        el.dragFlag = true;
        if (isDragging) {
          let left = e.pageX - disx;
          let top = e.pageY - disy;

          el.style.left = left + 'px';
          el.style.top = top + 'px';
        }
      }

      document.onmouseup = function () {
        isDragging = false;

        let left = parseInt(el.style.left);
        if (left < screenWidth / 2) {
          el.style.left = '20px'; // 靠左贴边
        } else {
          el.style.left = screenWidth - el.offsetWidth - 20 + 'px'; // 靠右贴边
        }

        document.onmousemove = document.onmouseup = null;
      }
    }
  }
};

const openClipper = () => {
  if (campTool.value.dragFlag) return;
  cropperShow.value = true
}

onMounted(() => {
  dragDirective.mounted(campTool.value);
});
</script>

<style lang="scss" scoped>
.camp-tool-container {
  background-color: white;
  position: fixed;
  bottom: 100px;
  cursor: move;
  right: 20px;
  height: 50px;
  width: 50px;
  border-radius: 15px;
  box-shadow: 3px 3px 15px rgba(138, 138, 138,0.5);
  z-index: 2000;
  .campToolMain {
    font-size: 30px;
    text-align: center;
    padding: 8px;
  }
}
</style>