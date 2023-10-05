<template>
  <!-- 联系客服补充材料卡片 -->
  <el-dialog v-model="show" title="联系客服补充材料" width="30%">
    <img src="../../../../../assets/serverimg.png" style="width: 300px; margin-left: 43px" />
    <template #footer>
      <span>
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="show = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss" scoped></style>
