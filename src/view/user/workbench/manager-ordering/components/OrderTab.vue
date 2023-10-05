<template>
  <div class="tool-bar">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="全部订单" name="first"></el-tab-pane>
      <el-tab-pane label="待审核" name="second"></el-tab-pane>
      <el-tab-pane label="审核通过" name="third"></el-tab-pane>
      <el-tab-pane label="审核未通过" name="fourth"></el-tab-pane>
      <el-tab-pane label="订单取消" name="fifth"></el-tab-pane>
      <el-tab-pane label="订单退款" name="six"></el-tab-pane>
      <el-tab-pane label="异常订单" name="seven"></el-tab-pane>
      <el-tab-pane label="订单完成" name="eight"></el-tab-pane>
    </el-tabs>
    <div class="search-bar">
      <el-input
        style="width: 400px"
        v-model="searchWord"
        placeholder="请输入"
        class="input-with-select">
        <template #prepend>
          <el-select v-model="selectTag" style="width: 115px">
            <el-option label="订单编号" value="1" />
            <el-option label="商品ID" value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const searchWord = ref('')
const selectTag = ref('')
const activeTab = ref('first')
</script>

<style lang="scss" scoped>
.tool-bar {
  margin-left: 24px;
  padding: 20px;
  background-color: #ffffff;
}
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
