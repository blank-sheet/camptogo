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

  box-sizing: border-box;
  position: fixed;
  background-color: white;
  width: calc(100vw - 200px);
  height: 60px;
  bottom: 0;
  display: flex;
  padding-left: 40px;
  justify-content: flex-end;
  padding-right: 84px;
  align-items: center;
  z-index: 99;
  box-shadow: 7px -1px 5px 2px rgba(0, 0, 0, 0.1);

  .el-button {
    margin: 0 20px;
  }
}
</style>
