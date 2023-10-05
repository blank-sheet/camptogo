<template>
  <div v-loading.fullscreen.lock="store.isLoading">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useStore } from './store';
const store = useStore();
</script>

<style lang="scss" scoped></style>
