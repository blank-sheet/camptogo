<template>
  <File00 v-if="index === '0-0'" />
  <File01 v-if="index === '0-1'" />
  <File02 v-if="index === '0-2'" />
  <File03 v-if="index === '0-3'" />
  <File04 v-if="index === '0-4'" />
  <File10 v-if="index === '1-0'" />
  <File11 v-if="index === '1-1'" />
  <File12 v-if="index === '1-2'" />
  <File13 v-if="index === '1-3'" />
  <File15 v-if="index === '1-4'" />
  <File16 v-if="index === '1-5'" />
  <File17 v-if="index === '1-6'" />
  <File18 v-if="index === '1-7'" />
  <File19 v-if="index === '1-8'" />
  <File110 v-if="index === '1-9'" />
  <File111 v-if="index === '1-10'" />
  <File112 v-if="index === '1-11'" />
  <File113 v-if="index === '1-12'" />
  <File20 v-if="index === '2-0'" />
  <File21 v-if="index === '2-1'" />
  <File22 v-if="index === '2-2'" />
  <File23 v-if="index === '2-3'" />
  <File24 v-if="index === '2-4'" />
  <File25 v-if="index === '2-5'" />
  <File26 v-if="index === '2-6'" />
  <File27 v-if="index === '2-7'" />
  <File28 v-if="index === '2-8'" />
  <File29 v-if="index === '2-9'" />
  <File210 v-if="index === '2-10'" />
  <File211 v-if="index === '2-11'" />
  <File212 v-if="index === '2-12'" />
  <File213 v-if="index === '2-13'" />
  <File214 v-if="index === '2-14'" />
  <File215 v-if="index === '2-15'" />
  <File30 v-if="index === '3-0'" />
  <File31 v-if="index === '3-1'" />
  <File32 v-if="index === '3-2'" />
  <File33 v-if="index === '3-3'" />
  <File34 v-if="index === '3-4'" />
  <File35 v-if="index === '3-5'" />
  <File36 v-if="index === '3-6'" />
  <File37 v-if="index === '3-7'" />
  <File38 v-if="index === '3-8'" />
  <File39 v-if="index === '3-9'" />
  <File310 v-if="index === '3-10'" />
  <File311 v-if="index === '3-11'" />
  <File312 v-if="index === '3-12'" />
  <File313 v-if="index === '3-13'" />
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'
import { marked } from 'marked'
import File00 from './components/File00.vue'
import File01 from './components/File01.vue'
import File02 from './components/File02.vue'
import File03 from './components/File03.vue'
import File04 from './components/File04.vue'
import File10 from './components/File10.vue'
import File11 from './components/File11.vue'
import File12 from './components/File12.vue'
import File13 from './components/File13.vue'
import File15 from './components/File15.vue'
import File16 from './components/File16.vue'
import File17 from './components/File17.vue'
import File18 from './components/File18.vue'
import File19 from './components/File19.vue'
import File110 from './components/File110.vue'
import File111 from './components/File111.vue'
import File112 from './components/File112.vue'
import File113 from './components/File113.vue'
import File20 from './components/File20.vue'
import File21 from './components/File21.vue'
import File22 from './components/File22.vue'
import File23 from './components/File23.vue'
import File24 from './components/File24.vue'
import File25 from './components/File25.vue'
import File26 from './components/File26.vue'
import File27 from './components/File27.vue'
import File28 from './components/File28.vue'
import File29 from './components/File29.vue'
import File210 from './components/File210.vue'
import File211 from './components/File211.vue'
import File212 from './components/File212.vue'
import File213 from './components/File213.vue'
import File214 from './components/File214.vue'
import File215 from './components/File215.vue'
import File30 from './components/File30.vue'
import File31 from './components/File31.vue'
import File32 from './components/File32.vue'
import File33 from './components/File33.vue'
import File34 from './components/File34.vue'
import File35 from './components/File35.vue'
import File36 from './components/File36.vue'
import File37 from './components/File37.vue'
import File38 from './components/File38.vue'
import File39 from './components/File39.vue'
import File310 from './components/File310.vue'
import File311 from './components/File311.vue'
import File312 from './components/File312.vue'
import File313 from './components/File313.vue'

defineProps({
  index: {
    default: '0-0'
  }
})
const update = () => {
  const file = document.querySelector('pre')
  if (file) {
    file.innerHTML = marked.parse(file.textContent)
  }
}
onMounted(() => {
  update()
})
onUpdated(() => {
  update()
})
</script>
<style lang="scss">
el-main {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}
pre {
  white-space: pre-wrap;
  padding: 40px;
  word-break: break-all;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serif;
  img {
    border-radius: 10px;
    width: 70vw;
    display: flex;
    margin: 0 auto;

  }
  table {
    border-spacing: 0;
    width: 100%;
  }
  td,
  th {
    border: 0.2px solid #666;
    padding: 5px;
  }
}
@media (max-width: 768px) {
  aside {
    display: none;
  }
  .el-header {
    display: none;
  }
  pre {
    white-space: initial;
  }
}
.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel__item.active {
  opacity: 1;
}

.carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
pre{
  font-size: 1.8vh;
  li{
    margin-left: 3vw;
  }
  p{
    line-height: 3.5vh;
    strong{
      position: relative;
      line-height: 10px;
    }
  }
  a{
    display: inline-block;
    width: auto;
  }
  h1{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
