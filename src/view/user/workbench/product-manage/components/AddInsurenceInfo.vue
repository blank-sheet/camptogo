<template>
  <ElDialog v-model="visiable">
    <div>
      <ElSteps :active="step">
        <ElStep
          v-for="item in [
            '提示!',
            '为非营探报名的出行人投保,请选择团期:',
            '增加非营探出行人投保信息信息',
            '确认投保信息'
          ]"
          :title="item"
          :key="item" />
      </ElSteps>
      <section v-if="step === 0">
        <p>
          您为非营探平台报名人员投保，须在提交投保信息后扫码缴费，营探平台无法为您代缴此部分保费
        </p>
      </section>
      <section v-if="step === 1">
        <ElRadioGroup>
          <ElRadio label="11" />
          <ElRadio label="22" />
        </ElRadioGroup>
      </section>
      <section v-if="step === 3">
        <div>
          <div>商品ID</div>
          <div><span>商品名称:</span> <span>团期</span></div>
        </div>
        <ElForm>
          <ElFormItem label="姓名"><ElInput /></ElFormItem>
          <ElFormItem label="手机号"><ElInput /></ElFormItem>
          <ElFormItem label="身份证号"><ElInput /></ElFormItem>
        </ElForm>
        <div>
          <ElButton>只能粘贴</ElButton>
          <ElButton>清空</ElButton>
          <ElButton>确定</ElButton>
        </div>
        <ElFormItem label="批量导入">
          <ElButton>选取文件</ElButton>
          <span>xxx.xlsx</span>
        </ElFormItem>
        <ElFormItem label="已成功导入的出行人信息"> </ElFormItem>
      </section>
      <section v-if="step === 3">保险价格及保障内容的页面</section>
    </div>
    <footer>
      <ElButton>取消</ElButton>
      <ElButton @click="nextStep">确认</ElButton>
    </footer>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  visiable: Boolean
})
const step = ref(0)
const radio = ref('')
const nextStep = () => {
  step.value += 1
}
</script>

<style lang="scss" scoped></style>
