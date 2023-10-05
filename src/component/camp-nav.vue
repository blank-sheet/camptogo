<template>
  <nav class="camp-nav" :style="{
    flexDirection: column ? 'column' : 'row'
  }">
    <span v-for="(nav, index) in navOptions" :class="{
      'nav-active': activeNav == index && !solid,
      'solid-active': activeNav == index && solid,
      'column': column,
      'row': !column
    }" @click="changeRoute(index, nav.navTo)">{{ nav.label }}</span>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  column: {
    default: false
  },
  navOptions: {
    default: [
      {
        label: '文字',
        navTo: ''
      }
    ]
  },
  solid: {
    default: false
  }
})
const activeNav = ref(0)
const changeRoute = (index, url) => {
  router.push(url)
  activeNav.value = index
  window.sessionStorage.setItem(JSON.stringify(props.navOptions), index)
}
onMounted(() => {
  activeNav.value = window.sessionStorage.getItem(JSON.stringify(props.navOptions)) || 0
})
</script>

<style lang="scss">
.camp-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
    font-size: 20px;
    color: var(--el-text-color-primary);
  }

  span.row {
    margin: 0px 20px;
  }

  span.column {
    width: 180px;
    font-weight: 400;
    height: 40px;
    font-size: 14px;
    margin: 4px 0;
  }

  span.nav-active {
    background-color: var(--primary-color);
    color: #ffff;
    border-radius: 4px;

    &:hover {
      background-color: var(--primary-color);
      color: #ffff;
    }
  }

  span.solid-active {
    color: black;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      height: 2px;
      width: 30px;
      background-color: var(--primary-color);
    }
  }
}
</style>
