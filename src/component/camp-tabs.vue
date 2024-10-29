<template>
	<div class="c-slide-switch">
		<div class="tabs-container">
      <!-- silder 是高亮的颜色 -->
			<span class="slider" :class="{ 'is-transition': animation }">{{ showSliderName }}</span>
			<span
				v-for="(item, index) in dataSource"
				:key="index"
				ref="sliderItemRef"
				style="z-index: 66"
				:class="{ actived: currentValue === item[propsAttr.value] }"
				@click="changeSlide(index, item[propsAttr.value])"
			>
				{{ item[propsAttr.label] }}
			</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue"

type Props = {
  modelValue?: any; // 数值
	dataSource: any[]; // 数据源
	propsObj?: { [key: string]: any }; // 读取的字段属性
  animation?: boolean; // 是否开启动画
  duration?: number; // 动画时长 注意单位为毫秒 
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	dataSource: () => [],
	propsObj: () => {
		// 属性
		return {};
	},
	animation: true,
  duration: 500
})

const emit = defineEmits(["update:modelValue", "change"])
 
const propsAttr = computed(() => {
	const obj = {
		label: "label",
		value: "value"
	}
	return Object.assign(obj, props.propsObj)
})
 
const sliderItemRef = ref() // slider下的每个item实例
const currentValue = ref(props.modelValue) // 记录当前激活的值
const sliderOffsetLeft = ref("0") // 记录滑块需要滑动的距离
 
// 用于在slider滑块上展示的文案--这个文案的作用主要是撑开slider滑块的宽度
const showSliderName = computed(() => {
	const target = props.dataSource.find((item: any) => item[propsAttr.value.value] === currentValue.value)
	return target[propsAttr.value.label]
})

// 滑块的动画时常
const sliderDuration = computed(() => {
  return (props.duration / 1000) + "s";
})
 
// 监听激活的值的变化发射事件
watch(
	() => currentValue.value,
	() => {
		emit("update:modelValue", currentValue.value);
	},
	{ immediate: true }
)
 
// 切换滑块
const changeSlide = (index: number, value: any) => {
	const offset = 4; // 偏移量
  // 更改滑块 滑动的距离
	sliderOffsetLeft.value = sliderItemRef.value[index].offsetLeft - offset + "px";
  // 记录当前激活的值
	currentValue.value = value;
	emit("change", value);
}
</script>
 
<style lang="scss" scoped>
.tabs-container {
  position: relative;
	display: inline-flex;
	align-items: center;
	padding: 4px;
	overflow: hidden;
	background: rgba(242, 242, 242, 1);
	border-radius: 6px;
	span {
		display: inline-block;
		padding: 8px 12px;
		font-size: 14px;
		color: #606266;
		cursor: pointer;
	}
	.slider {
		position: absolute;
		display: inline-block;
		transform: translateX(v-bind(sliderOffsetLeft));
		overflow: hidden;
		color: transparent;
		background-color: #fff;
    border: 1px solid rgba(191, 191, 191, 1);
    // color: rgba(89, 89, 89, 1);
		border-radius: 6px;
	}
  .is-transition {
    transition: all v-bind(sliderDuration);
  }
	.actived {
		z-index: 99;
		color: rgba(89, 89, 89, 1);
		border-radius: 6px;
	}
}
</style>