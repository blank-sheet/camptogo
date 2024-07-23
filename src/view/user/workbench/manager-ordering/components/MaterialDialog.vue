<template>
  <!-- 联系客服补充材料卡片 -->
  <el-dialog v-model="show" title="联系客服补充材料" width="30%">
    <div class="flex-box">
      <img src="../../../../../assets/server.jpg" style="width: 300px;" />
    </div>
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

defineExpose({
  getInfo: () => {
    show.value = true
  }
})
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
