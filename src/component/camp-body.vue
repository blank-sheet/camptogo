<template>
  <div class="user-layout">
    <el-container>
      <el-container>
        <el-aside :width="sideWidth + 'px'">
          <slot name="side"> </slot>
        </el-aside>
        <el-main>
          <div style="padding-bottom: 10vh">
            <slot name="main"></slot>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
defineProps({
  sideWidth: {
    default: 13
  }
})
</script>

<style lang="scss">
.user-layout {
  width: 100vw;
  height: 92vh;

  .el-main {
    background-color: #f5f5f5;
    padding: 0;
    height: calc(100vh - 60px);
    overflow: scroll;
  }

  .el-container {
    max-height: calc(100vh - 60px);

  }

  .el-aside {
    position: relative;
    box-shadow: 4px 3px 9px 0px rgb(0 0 0 / 4%);

  }
}
</style>
