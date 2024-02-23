<template>
  <!-- 表单校验组件,方便校验是否填写 -->
  <!-- 校验方式：
1. 基本类型：form.name
2. 对象：通过obj.attr来校验对象的某个属性是否为空
3. 数组：isArr
   -->
  <el-form-item :class=" labelTop ? 'labelTop' : '' " :label="label" :prop="prop" :rules="{
    trigger: 'blur',
    message: msg,
    required: true
  }">
    <template #label>
      <slot name="label"></slot>
    </template>
    <slot></slot>
  </el-form-item>
</template>

<script setup>
const props = defineProps({
  label: {
    default: ''
  },
  labelTop: {
    default: false
  },
  prop: {
    default: ''
  },
  isArray: {
    default: false
  },
  msg: {
    default: '该选择为必填项'
  }
})
</script>

<style lang="scss" scoped>
.labelTop {
  display: flex;
  flex-direction: column;
}
</style>
