<template>
  <footer>
    <slot> </slot>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  button {
    font-weight: 400;
  }

  position: fixed;
  background-color: white;
  width: 100vw;
  height: 60px;
  bottom: 0;
  display: flex;
  padding-left: 800px;
  justify-content: flex-start;
  padding-right: 84px;
  align-items: center;
  z-index: 99;
  box-shadow: 7px -1px 5px 2px rgba(0, 0, 0, 0.1);

  .el-button {
    margin: 0 20px;
  }
}
</style>
