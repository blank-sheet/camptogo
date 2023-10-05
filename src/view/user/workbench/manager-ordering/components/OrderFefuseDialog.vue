<template>
  <!-- 订单审核不通过卡片 -->
  <el-dialog v-model="show" title="请选择不通过理由" width="30%">
    <el-radio-group v-model="radio">
      <el-radio :label="1">报名人数已满</el-radio>
      <el-radio :label="2">重复报名同一时段的同一产品</el-radio>
      <el-radio :label="3">不符合年龄要求</el-radio>
      <el-radio :label="4">不符合出行要求</el-radio>
      <el-radio :label="5">其它</el-radio>
      <el-input
        v-model="reason"
        autosize
        type="textarea"
        placeholder="请填写不通过内容，不超过14个字"
        maxlength="14"
        v-show="radio == 5" />
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="show = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const radio = ref(1)
const reason = ref('')
</script>

<style lang="scss" scoped></style>
