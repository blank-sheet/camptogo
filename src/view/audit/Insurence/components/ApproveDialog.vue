<template>
  <ElDialog title="通过审核" v-model="showDialog" @close="emits('update:show', false)">
    <div>
      <h3>保险价格</h3>
      <div class="part">
        <span>组织者责任险: ''</span>
        <CampCheckBox v-model:check="form.liabilityInsuranceConfirm" />
      </div>
      <ElTable v-if="form.liabilityInsuranceConfirm" :data="tableData" border header-row-class-name="th-header">
        <ElTableColumn label='周岁'>
          <template #default="scope">{{ scope.row.title }}周岁:</template>
        </ElTableColumn>
        <ElTableColumn label='基础费率'>
          <template #default="scope">{{ scope.row.basic }}</template>

        </ElTableColumn>
        <ElTableColumn label='费率调整因子'>
          <template #default="scope">
            <ElSelect v-model="ratioInfo[ageMap[scope.row.index]]">
              <ElOption v-for="o in ratioOptions" :label="o.label" :value="o.value"></ElOption>
            </ElSelect>
          </template>
        </ElTableColumn>
        <ElTableColumn label='保险报价'>
          <template #default="scope">
            <span class=" text-green-600">{{ getPrice(ratioInfo[ageMap[scope.row.index]]) }}</span>
            (单位:元每人每天)</template>
        </ElTableColumn>
      </ElTable>
      <ElInput v-model="form.liabilityInsuranceReviewRemark" type="textarea" placeholder="请输入拒绝承保的原因或须补充提供的材料"
        class="h-[128px]" style="width: 433px;" v-else>
      </ElInput>
    </div>
    <div class="part">
      <span>意外险: ''</span>
      <CampCheckBox v-model:check="form.liabilityInsuranceConfirm" />
    </div>
    <div v-if="form.accidentInsuranceConfirm" class=" flex justify-start items-center">
      <el-input-number v-model="form.accidentInsurancePrice" placeholder="请输入数字" :controls="false"></el-input-number>
      <div class=" text-teal-500 ml-5">(单位: 元每人)</div>
    </div>
    <ElInput v-else v-model="form.accidentInsuranceReviewRemark" type="textarea" class="h-[128px]" style="width: 433px;"
      placeholder="请输入拒绝承担的原因或须补充提供的材料" />
    <template #footer>
      <ElButton type="primary" @click="approve">确认</ElButton>
      <ElButton @close="emits('update:show', false)">取消</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElSelect } from 'element-plus'
import { reactive, ref, watch, computed, onMounted } from 'vue'
import CampCheckBox from '../../../../component/camp-check-box.vue'
import { request } from '../../../../api'
import { auditApi } from '../../../../api/modules/audit'
const props = defineProps({
  show: Boolean,
  productId: Number,
  workTicketId: Number
})

const emits = defineEmits(['update:show', 'reset-table'])
const titles = ['1-5', '6-11', '12-70']

const showDialog = ref(false)
const liabilityInsurances = ref([
  {
    insuranceId: 1,
    insuranceGradeId: 2,
    rationType: '',
    productCode: '',
    title: '',
    description: '',
    premium: 520, // 保费
    ratio: 1 // 因子
  }
])
watch(
  () => props.show,
  () => {
    showDialog.value = props.show
    if (props.show) {
      request.post(auditApi.insurenceApproveInfo, {
        productId: props.productId
      }).then((res: any) => {
        if(res.details)
        liabilityInsurances.value = res.details.liabilityInsurances
      })
    }
  }
)
const tableData = computed(() => {
  return titles.map((title, index) => {
    return {
      title,
      basic: basicValue.value,
      index,
    }
  })
})
const ratioOptions = computed(() => liabilityInsurances.value.map(l => {
  return {
    label:l.ratio,
    value:l.ratio
  }
}))
// 基础费率
const basicValue = computed(() => liabilityInsurances.value.find(l => l.ratio === 1)?.premium)
const ageMap = {
  0: 'lessThanSixLiabilityInsuranceId',
  1: 'sixToElevenLiabilityInsuranceId',
  2: 'greaterThanElevenLiabilityInsuranceId'
} as any
const getPrice = (target=0) => {
  if(!target) return '**'
  return liabilityInsurances.value.find(l=>l.ratio==target)?.premium || '**'
}
const ratioInfo = reactive({
  lessThanSixLiabilityInsuranceId: '',
  sixToElevenLiabilityInsuranceId: '',
  greaterThanElevenLiabilityInsuranceId: ''
}) as any
const form = reactive({
  // 责任险审核意见
  liabilityInsuranceReviewRemark: '',
  accidentInsuranceReviewRemark: '',
  liabilityInsuranceConfirm: true,
  accidentInsuranceConfirm: true,
  // 意外险单价
  accidentInsurancePrice: 0
})
const approve = () => {
  request.post(
    auditApi.insurenceApprove,
    {
      workTicketId: props.workTicketId,
      ...ratioInfo,
      ...form
    },
    {
      message: true,
      loading: true
    } as any
  ).then(() => {
    emits('update:show', false)
  })
}

</script>

<style lang="scss">
.el-dialog {
  height: 650px;

  >div {
    margin: 20px;
  }

  .el-textarea__inner {
    height: 80px;
  }

  .th-header {
    th {
      color: rgb(28, 28, 28);
      font-weight: 400;
      background-color: rgb(237, 237, 237);
    }
  }

  .part {
    margin: 20px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;

    >span {
      width: 100px;
      white-space: nowrap;
      margin-right: 20px;
    }
  }
}
</style>
