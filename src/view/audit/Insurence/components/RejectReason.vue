<template>
  <ElDialog title="拒绝承保" v-model="showDialog" @close="emits('update:show', false)">
    <div>
      <h4>请输入拒绝承保的原因或须补充提供的材料：</h4>
      <ElInput type="textarea" placeholder="请输入拒绝承保的原因或须补充提供的材料" />
      <div style="display: flex; justify-content: flex-end; margin: 20px 0">
        <ElButton style="margin-left: auto" type="primary" @click="handleConfirm">确认</ElButton>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElInput } from 'element-plus'
import { ref, watch } from 'vue'
const props = defineProps({
  show: Boolean
})
watch(
  () => props.show,
  () => {
    showDialog.value = props.show
  }
)
const emits = defineEmits(['update:show'])
const showDialog = ref(false)
const handleConfirm = () => {
  emits('update:show', false)
}
</script>

<style lang="scss">
.el-dialog__header {
  border-bottom: 1px solid lightgray;
  height: 65px;
  line-height: 50px;

  h4 {
    font-size: larger;
    margin: 20px 0;
  }
}

textarea {
  height: 200px;
}

.el-dialog__body {
  padding-top: 0;
}</style>
