<template>
  <ElDialog title="添加法务意见" v-model="showDialog" @close="emits('update:show', false)" class="rj">
    <div>
      <div class="reason">
        <h4>拒绝承保的原因:</h4>
        <p>
          保险公司的拒绝
        </p>
      </div>
      <div class="reason">
        <h4>法务审核意见:</h4>
        <ElInput v-model="reasonText" type="textarea" placeholder="请输入意见" />
      </div>
      <div style="display: flex; justify-content: flex-end; margin: 20px 0">
        <ElButton style="margin-left: auto" type="primary" @click="handleConfirm">确认</ElButton>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElInput } from 'element-plus'
import { ref, watch } from 'vue'
import { request } from '../../../../api'
import { auditApi } from '../../../../api/modules/audit'
const props = defineProps({
  show: Boolean,
  workTicketId: Boolean
})
watch(
  () => props.show,
  () => {
    showDialog.value = props.show
  }
)
const emits = defineEmits(['update:show', 'reset-table'])
const reasonText = ref('')
const showDialog = ref(false)
const handleConfirm = () => {
  emits('update:show', false)
  request
    .post(
      auditApi.productOrInsurenceReject,
      {
        workTicketId: props.workTicketId,
        reviewRemark: reasonText.value
      },
      {
        message: true
      } as any
    )
    .then(() => emits('reset-table'))
}
</script>

<style lang="scss">
.el-dialog__header {
  border-bottom: 1px solid lightgray;
  height: 50px;
  line-height: 50px;
}

div.rj {
  height: 400px;
  width: 600px;
}

textarea {
  height: 150px;
}

.el-dialog__body {
  padding: 0;
}

.reason {
  h4 {
    margin: 20px 0 !important;
  }

  p {
    padding-left: 40px;
    line-height: 20px;
    font-size: small;
  }
}
</style>
