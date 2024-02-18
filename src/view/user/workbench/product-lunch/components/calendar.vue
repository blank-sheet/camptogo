<template>
  <div class="calendar-container">
    <div class="scheduls" v-for="(item, index) in dailyScheduleList" :key="index">
		<div style="background-color: #f2f2f2">
      <div class="schdule" v-for="(daily, i) in item.itemList" :key="i">
        <div class="schdule-box">
          <campTimePicker :initial="daily.startTime" v-model:time="daily.startTime" :disabled="true" />
          <span style="margin: 0 10px 0 0">-</span>
          <campTimePicker :initial="daily.endTime" v-model:time="daily.endTime" :disabled="true" />
          <el-input placeholder="请填写日程安排" style="width: 50%" v-model="daily.detail" disabled />
        </div>
      </div>
    </div>
    </div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import campTimePicker from '../../../../../component/camp-time-picker.vue'
defineProps({
  dailyScheduleList: {
    default: []
  }
})
</script>

<style lang="scss" scoped>
.calendar-container {
  .scheduls {
    width: 500px;
    .schdule {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 10px;
      background: #f2f2f2;
      .schdule-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>