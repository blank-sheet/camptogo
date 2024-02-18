<template>
  <div class="schedule-container">
		<div class="container-title">商品活动排期</div>
		<div class="good-info">
			<el-form :inline="true" :model="formInline" label-width="auto">
				<el-form-item label="商品名称：">
					{{ product.fullName }}
				</el-form-item>
				<el-form-item label="商品类别：">
					{{ product.activityMode }}
				</el-form-item>
				<el-form-item label="商品创建日期：">
					{{ product.createTime }}
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-collapse class="collapse-container" v-model="activeName" accordion>
				<el-collapse-item v-for="(item, index) in product.groupPeriodList" :key="index" :name="index">
					<template #title>
						<div class="collapse-title">
							<el-form-item class="form-item-lable" :label="'排期'+(index+1)+':'" label-width="auto">
								{{ product.groupPeriodList[index].activityTimeRange[0].slice(0, 4) }}年 . 
								{{ product.groupPeriodList[index].activityTimeRange[0].slice(5, 7) }}月 .
								{{ product.groupPeriodList[index].activityTimeRange[0].slice(8, 10) }}日 - 
								{{ product.groupPeriodList[index].activityTimeRange[1].slice(0, 4) }}年 . 
								{{ product.groupPeriodList[index].activityTimeRange[1].slice(5, 7) }}月 .
								{{ product.groupPeriodList[index].activityTimeRange[1].slice(8, 10) }}日
							</el-form-item>
						</div>
					</template>
					<div class="collapse-item">
						<div class="date-picker-item">
							<CampDatePicker v-model="product.groupPeriodList[index].activityTimeRange[0]" :disabled="true" placeholder="开始日期" />
              <span style="margin: 0 10px 0 0"> - </span>
              <CampDatePicker v-model="product.groupPeriodList[index].activityTimeRange[1]" :disabled="true" placeholder="结束日期" />
              <span>共{{ difftime[0] }}天</span>
						</div>
						<el-form-item class="form-item-lable" label="日程表：" label-width="auto">
							<div class="" v-for="(item, i) in difftime[0]" :key="i">
								<div class="date-picker">
									<CampDatePicker v-model:date="getDatesBetween(product.groupPeriodList[index].activityTimeRange[0], product.groupPeriodList[index].activityTimeRange[1])[i]" :disabled="true" placeholder="开始日期" />
								</div>
								<div class="calendar"><Calendar :dailyScheduleList="product.dailyScheduleList" /></div>
							</div>
						</el-form-item>
					</div>
				</el-collapse-item>

				<el-collapse-item name="new" v-if="isAdd">
					<template #title>
						<div class="collapse-title">
							<el-form-item class="form-item-lable" :label="'排期'+(product.groupPeriodList?.length+1)+':'" label-width="auto">
								{{ newSchedule[0] ? newSchedule[0].slice(0, 4) : '' }}年 . 
								{{ newSchedule[0] ? newSchedule[0].slice(5, 7) : '' }}月 .
								{{ newSchedule[0] ? newSchedule[0].slice(8, 10) : '' }}日 - 
								{{ newSchedule[1] ? newSchedule[1].slice(0, 4) : '' }}年 . 
								{{ newSchedule[1] ? newSchedule[1].slice(5, 7) : '' }}月 .
								{{ newSchedule[1] ? newSchedule[1].slice(8, 10) : '' }}日
							</el-form-item>
						</div>
					</template>
					<div class="collapse-item">
						<div class="date-picker-item">
							<CampDatePicker v-model="newSchedule[0]" placeholder="开始日期" />
              <span style="margin: 0 10px 0 0"> - </span>
              <CampDatePicker v-model="newSchedule[1]" placeholder="结束日期" />
              <span>共{{ difftime[0] }}天</span>
						</div>
						<el-form-item class="form-item-lable" label="日程表：" label-width="auto">
							<div class="" v-for="(item, index) in difftime[0]" :key="index">
								<div class="date-picker">
									<CampDatePicker v-model:date="getDatesBetween(newSchedule[0], newSchedule[1])[index]" :disabled="true" placeholder="活动日期" />
								</div>
								<div class="calendar"><Calendar :dailyScheduleList="product.dailyScheduleList" /></div>
							</div>
						</el-form-item>
						<div class="collapse-btns">
							<el-button @click="isAdd = false">取消</el-button>
          		<el-button type="primary" @click="addScheduleBtn">确定新增</el-button>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
			<div class="bottom-btn">
				<el-button type="primary" v-if="!isAdd" @click="isAdd = true">+ 添加更多团期</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import Calendar from './components/calendar.vue';
import { ElMessage } from 'element-plus'
import CampDatePicker from '../../../../component/camp-date-picker.vue';
import { ref, onMounted, computed, watch } from "vue";
import { userApi } from "../../../../api/modules/user/user";
import { request } from "../../../../api";
import { useRoute } from "vue-router";
const route = useRoute();
const product = ref({})
const daysLimit = ref(0);
const newSchedule = ref([undefined, undefined])
const copySchedule = ref([undefined, undefined])
const isAdd = ref(false)

watch(
  () => newSchedule.value,
  (newValue, oldValue) => {
    if (newValue[0] != copySchedule.value[0]) {
      newSchedule.value[1] = addDays(newValue[0], daysLimit.value[0]);
			copySchedule.value = newSchedule.value.slice()
			return
    }
    if (newValue[1] != copySchedule.value[1]) {
      newSchedule.value[0] = subtractDays(newValue[1], daysLimit.value[0]);
			copySchedule.value = newSchedule.value.slice()
			return
    }
  },
  {
    deep: true
  }
)

const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

const subtractDays = (dateString, days) => {
	console.log(dateString);
	console.log(days);
  const date = new Date(dateString);
  date.setDate(date.getDate() - days + 2);
	console.log(date.toISOString());
  return date.toISOString();
}

const difftime = computed(() => {
  const times = []
  product.value.groupPeriodList?.forEach(t => {
    const t1 = getTime(t.activityTimeRange[0])
    const t2 = getTime(t.activityTimeRange[1])
    times.push(Math.ceil(Math.abs((t1 - t2) / (1000 * 60 * 60 * 24))) + 1)
  })
  let dailyIndex = 1;
  product.value.dailyScheduleList = product.value.dailyScheduleList?.slice(0, times[0]).map((daily) => {
    daily.dailyIndex = dailyIndex++;
    return daily;
  });
	daysLimit.value = times
  return times
  function getTime(dateString = undefined) {
    if (!dateString) return new Date().getTime()
    const times = dateString?.split(/[-:]/)
    times[2] = times?.[2]?.slice(0, 2) || undefined
    const [year, month, day] = times.map(Number)
    return new Date(year, month - 1, day).getTime()
  }
})

const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
	const endTime = new Date(endDate);

	currentDate.setHours(0, 0, 0, 0);
  endTime.setHours(0, 0, 0, 0);

  while (currentDate <= endTime) {
		currentDate.setDate(currentDate.getDate() + 1);
    dates.push(formatDateTime(new Date(currentDate)));
  }
  return dates;
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+0000`;
}

const addScheduleBtn = () => {
	if (!newSchedule.value[0] && !newSchedule.value[1]) {
		ElMessage('请选择日期')
		return
	}
	request
		.post(userApi.addSchedule, {
      productId: route.params.id,
      activityTimeRange: newSchedule.value
    })
    .then(r => {
			getSchedule()
			newSchedule.value = [undefined, undefined]
	    copySchedule.value = [undefined, undefined]
			ElMessage({
        type: 'success',
        message: '添加成功'
      })
			isAdd.value = false
    })
}

const getSchedule = () => {
  request
    .post(userApi.getProduct, {
      productId: route.params.id
    })
    .then(r => {
			let productInfo = r.details
			productInfo.createTime = productInfo.createTime.slice(0, 10) 
      console.log(productInfo);
			product.value = productInfo
		})
}

onMounted(() => {
	getSchedule()
});
</script>

<style lang="scss" scoped>
.schedule-container {
	padding: 20px 24px;
	.container-title {
		color: #000000;
		font-size: 16px;
		font-weight: 600;
		padding-left: 20px;
	}
  .good-info {
		margin: 20px 0;
		background-color: #fff;
		padding: 15px 20px;
	}
	.collapse-title {
		padding: 0 24px;
	}
	.collapse-item {
		width: 100%;
		padding: 24px 24px 0;
		.date-picker-item {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
		}
		.date-picker {
			margin-bottom: 15px;
		}
		.calendar {
			margin-bottom: 15px;
		}
	}
	.collapse-btns {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bottom-btn {
		width: 100%;
		display: flex;
		align-content: center;
		justify-content: center;
	}
}
</style>
<style lang="scss">
.good-info {
	.el-form-item {
		margin-bottom: 0;
		margin-right: 80px;
	}
	.el-form-item__label-wrap {
		margin-left: 0 !important;
	}
	.el-form-item__label,
	.el-form-item__content {
		color: #262626;
		font-size: 14px;
	}
}
.collapse-container {
  .el-form-item__content {
    flex-direction: column;
    align-items: start;
  }
	.el-collapse-item__arrow {
	 	margin: 0 20px 0 auto;
		width: 60px;
		color: #93D600;
	}
  .el-collapse-item__arrow:before {
    content: "展开";
    font-size: 12px;
    color: #93D600;
		font-style: normal;
  }
	.el-collapse-item__arrow svg {
    margin-left: 5px;
  }
  .el-collapse-item__arrow.is-active {
    transform: none;
  }
	.el-collapse-item__arrow.is-active svg {
		transform: rotate(90deg);
	}
  .el-collapse-item__arrow.is-active::before {
    content: "收起";
    font-size: 12px;
    color: #93D600;
	  font-style: normal;
  }
}
.form-item-lable {
	margin-bottom: 0;
	.el-form-item__label,
	.el-form-item__content {
		color: #262626;
		font-size: 14px;
	}
}
.el-collapse-item__header.is-active {
	border-bottom-color: #00000026;
}
.bottom-btn {
	margin-top: 30px;
	.el-button {
		padding: 0 100px;
		font-size: 14px;
	}
}
</style>