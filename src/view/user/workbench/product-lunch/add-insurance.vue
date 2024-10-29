<template>
  <div class="schedule-container">
		<div class="container-box">
      <div class="container-item">
        <div class="container-title">商品信息</div>
        <el-form :inline="true" :model="formInline" label-width="auto">
          <el-form-item label="商品名称：">
            {{ product.fullName }}
          </el-form-item>
          <el-form-item label="团期：">
            <span>{{ product.multigroupProductType == 'MULTIGROUP_PARENT' ? 
              (product?.groupPeriodList.find(i => i.subProductId == scheduleRadio)?.activityTimeRange[0]?.substring(0, 10) + ' - ' + product?.groupPeriodList.find(i => i.subProductId == scheduleRadio)?.activityTimeRange[1]?.substring(0, 10)) : 
              (product.activityStartDateTime?.substring(0, 10) + ' - ' + product.activityEndDateTime?.substring(0, 10)) }}</span>
            <el-button type="primary" v-if="product.multigroupProductType == 'MULTIGROUP_PARENT'" link style="margin-left: 12px; font-size: 14px;" @click="dialogShow = true">更换</el-button>
          </el-form-item>
          <el-form-item label="商品状态：">
            {{ getProductStatus(product.productStatus) }}
          </el-form-item>
        </el-form>
      </div>
      <div class="container-item">
        <div class="container-title">投保信息</div>
        <div class="container-title" style="margin-top: 24px;">组织者责任险</div>
        <el-form :inline="true" :model="formInline" label-width="auto">
          <el-form-item label="购买方式：">
            与营探合作的第三方保险
          </el-form-item>
          <el-form-item label="购买方案：">
            <span>{{ liabilityGradeList.find(i => i.insuranceGradeId == product?.insuranceInfo?.liabilityInsuranceGradeId)?.title }}</span>
            <el-button type="primary" link style="margin-left: 12px; font-size: 14px;" @click="goInfo">查看投保信息</el-button>
          </el-form-item>
        </el-form>
        <div class="container-title" style="margin-top: 24px;">人身意外险</div>
        <el-form :inline="true" :model="formInline" label-width="auto">
          <el-form-item label="营探报名用户购买方式：">
            {{ product?.insuranceInfo?.freeAccidentInsurance ? (product?.insuranceInfo?.freeAccidentInsuranceSelfIf ? (product?.insuranceInfo?.accidentInsuranceSelfCompanyName + ' - ' + product?.insuranceInfo?.accidentInsuranceSelfName + ' - ' + product?.insuranceInfo?.accidentInsuranceSelfCoverage + '万元/人') : '与营探合作的第三方保险') : '不赠送人身意外险' }}
          </el-form-item>
          <el-form-item label="营探报名用户购买方案：" v-if="product?.insuranceInfo?.freeAccidentInsurance">
            <span>{{ liabilityGradeList.find(i => i.insuranceGradeId == product?.insuranceInfo?.liabilityInsuranceGradeId)?.title }}</span>
            <el-button type="primary" link style="margin-left: 12px; font-size: 14px;" @click="goInfo">查看投保信息</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" label-width="auto">
          <el-form-item label="非营探报名用户购买方案：">
            <span>{{ schemeRadio == 0 ? '不赠送人身意外险' : accidentGradeList.find(i => i.insuranceGradeId == schemeRadio)?.title }}</span>
            <el-button type="primary" link style="margin-left: 12px; font-size: 14px;" @click="schemeShow = true">选择方案</el-button>
            <!-- <el-button type="primary" link style="margin-left: 12px; font-size: 14px;" @click="goInfo">查看投保信息</el-button> -->
          </el-form-item>
        </el-form>
      </div>

      <div class="container-item" style="border-bottom: none;">
        <div class="container-title container-btns">
          <div>
            <span>投保成员</span>
            <el-button type="primary" style="margin-left: 20px;" @click="addInsuranceShow = true">增加意外险投保人</el-button>
          </div>
          <div><el-button type="primary" @click="goPay">立即支付</el-button></div> 
        </div>
        <el-table :data="insuredPersonList" style="width: 100%">
          <el-table-column prop="realName" label="姓名" :width="200" />
          <el-table-column prop="realId" label="身份证号" />
          <el-table-column prop="phoneNumber" label="手机号" />
          <!-- <el-table-column prop="source" label="来源">
            <template #default="scope">
              <span>{{ scope.row.source == 0 ? '非营探出行人投保' : '营探出行人投保' }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="customerSource" label="来源" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span>{{ scope.row.status == 'NOT_INSURE_YET' ? '未支付' : '已支付' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="source" label="操作">
            <template #default="scope">
              <el-button type="primary" link :disabled="scope.row.status != 'NOT_INSURE_YET'" @click="deletePerson(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="pageNum" :update:page="(val) => pageNum = val" 
          v-model:limit="pageSize" :update:limit="(val) => pageSize = val" @pagination="getInsuredPersonList"></pagination>
      </div>
		</div>

    <el-dialog class="dialog" v-model="addInsuranceShow" title="增加意外险投保人" width="800" align-center :close-on-click-modal="false" :show-close="true">
      <div>
        <div class="add-insurance-header">
          <div style="display: flex; align-items: center;">
            <CampTabs v-model="slideValue" :data-source="btnList"></CampTabs>
            <span v-if="(tableData.length - externalUserList.length) > 0" style="margin-left: 12px;">表格中存在{{tableData.length - externalUserList.length}}条手机号或身份证号格式错误数据</span>
          </div>
          <el-button type="primary" link v-if="slideValue == '2'">下载模板</el-button>
        </div>
        <div class="add-insurance-box">
          <template v-if="slideValue == '0'">
            <el-form :model="policyholderForm" label-width="auto" label-position="left">
              <el-form-item label="姓名" prop="realName">
                <el-input v-model="policyholderForm.realName" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="policyholderForm.phoneNumber" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="身份证号" prop="realId">
                <el-input v-model="policyholderForm.realId" placeholder="请输入身份证号" />
              </el-form-item>
            </el-form>
            <div style="margin-top: 10px;"><el-button type="primary" @click="addExternalInsurance">确认</el-button></div>
          </template>
          <template v-if="slideValue == '1'">
            <div class="policyholder-text" contenteditable="true" placeholder="粘贴出行人信息，自动识别姓名、手机号、身份证号&#10;例：张三，13002270520，13098219990621742X&#10;此处智能粘贴仅支持一条信息粘贴，如有多条信息请使用批量导入进行解析"></div>
            <div><el-button type="primary" @click="addSmartText">确认</el-button></div>
          </template>
          <template v-if="slideValue == '2'">
            <camp-excel-upload v-if="step == 1" :on-success="handleSuccess"></camp-excel-upload>
            <el-table v-else :data="tableData" border highlight-current-row :height="tableData.length > 3 ? 400 : 'auto'" style="width: 100%; margin-bottom: 20px;">
              <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" >
                <template #default="scope">
                  <span v-html="formatCellText(scope.row, scope.column)"></span>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-button v-if="step != 1" @click="() => step--">上一步</el-button>
              <el-button type="primary" @click="goNext(step)">{{ step == 2 ? '确认' : '下一步' }}</el-button>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>

    <el-dialog class="dialog" v-model="dialogShow" title="选择团期" width="500" align-center :close-on-click-modal="false" :show-close="true">
      <div>
        <el-radio-group v-model="scheduleRadio">
          <el-radio v-for="(item, index) in product?.groupPeriodList" :key="index" :label="item.subProductId">{{ item?.activityTimeRange[0]?.substring(0, 10) + ' - ' + item?.activityTimeRange[1]?.substring(0, 10) }}</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogShow = false">取消</el-button>
          <el-button type="primary" @click="dialogShow = false, getInsuredPersonList()">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog class="dialog" v-model="schemeShow" title="选择人身意外险方案" width="500" align-center :show-close="true">
      <div>
        <el-radio-group v-model="schemeRadio">
          <el-radio :label="0">不赠送人身意外险</el-radio>
          <el-radio v-for="(item, index) in accidentGradeList" :key="index" :label="item.insuranceGradeId">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="schemeShow = false">取消</el-button>
          <el-button type="primary" @click="schemeShow = false">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog class="dialog" v-model="productShow" title="选择团期" width="500" align-center :close-on-click-modal="false" :show-close="true">
      <div>
        <el-form :model="product" label-width="auto" label-position="left">
          <el-form-item label="商品团期" prop="realName">
            <div v-if="product.multigroupProductType == 'MULTIGROUP_PARENT'" style="display: flex; align-items: center;">
              <el-select v-model="scheduleRadio">
                <el-option v-for="(item, index) in product?.groupPeriodList" :label="item?.activityTimeRange[0]?.substring(0, 10) + ' - ' + item?.activityTimeRange[1]?.substring(0, 10)"
                  :value="item.subProductId" :key="index">
                </el-option>
              </el-select>
              <el-button type="primary" link style="margin-left: 12px; font-size: 14px;" @click="() => router.push(`/user/workbench/schedule/${product.value.multigroupProductType == 'MULTIGROUP_PARENT' ? scheduleRadio.value : route.params.id}`)">新增商品团期</el-button>
            </div>
            <span v-else>{{ product.activityStartDateTime?.substring(0, 10) + ' - ' + product.activityEndDateTime?.substring(0, 10) }}</span>
          </el-form-item>
          <el-form-item label="组织者责任险方案" prop="liability">
            {{ liabilityGradeList.find(i => i.insuranceGradeId == product?.insuranceInfo?.liabilityInsuranceGradeId)?.title }}
          </el-form-item>
          <el-form-item label="人身意外险方案" prop="accident">
            <el-select v-model="schemeRadio">
              <el-option :value="0" label="不赠送人身意外险"></el-option>
              <el-option v-for="(item, index) in accidentGradeList" :label="item.title" :value="item.insuranceGradeId" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="productShow = false">取消</el-button>
          <el-button type="primary" @click="productShow = false">确认</el-button>
        </div>
      </template>
    </el-dialog>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, computed, watch } from "vue";
import pagination from '../../../../component/pagination.vue'
import CampTabs from '../../../../component/camp-tabs.vue'
import CampExcelUpload from '../../../../component/camp-excel-upload.vue'
import { userApi } from "../../../../api/modules/user/user";
import { request } from "../../../../api";
import { useRouter, useRoute } from 'vue-router'
import { getProductStatus } from '../../../../utils/getProductStatus'
import { useStore } from '../../../../store'

const store = useStore()
const router = useRouter()
const route = useRoute()
const product = ref({})
const total = ref(30)
const pageNum = ref(1)
const pageSize = ref(10)
const dialogShow = ref(false)
const addInsuranceShow = ref(false)
const liabilityGradeList = ref([])
const accidentGradeList = ref([])
const schemeShow = ref(false)
const scheduleRadio = ref(null)
const schemeRadio = ref(0)
const smartText = ref('')
const productShow = ref(false)
const tableData = ref([])
const tableHeader = ref([])
const externalUserList = ref([])
const step = ref(1)

const policyholderForm = ref({
  realName: '',
  phoneNumber: '',
  realId: ''
})

const btnList = [
	{ label: "手动输入", value: "0" },
	{ label: "智能粘贴", value: "1" },
	{ label: "批量导入", value: "2" }
];
const slideValue = ref("0");
const insuredPersonList = ref([])

const goInfo = () => {
  router.push("/user/workbench/insuranceinfo")
}

// 单条添加
const addExternalInsurance = () => {
  request
    .post(userApi.createExternalInsurance, {
      externalUserList: [policyholderForm.value],
      customerSource: '非营探人员投保',
      productId: route.params.id,
      providerId: store.providerId,
      accidentInsuranceGradeId: schemeRadio.value == 0 ? null : schemeRadio.value
    }, {
      loading: true
    })
    .then(r => {
      if (r.Code == 200) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getInsuredPersonList()
        addInsuranceShow.value = false
      }
    })
}

// 智能添加
const addSmartText = () => {
  let text = document.querySelector('.policyholder-text').innerHTML
  let textArr = text.split('，')
  if (textArr.length < 3) {
    ElMessage({
      message: '格式错误',
      type: 'error'
    })
    return
  }
  // 判断手机号格式是否正确
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(textArr[1])) {
    ElMessage({
      message: '手机号格式错误',
      type: 'error'
    })
    return
  }
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}([0-9Xx])$/
  // 判断身份证号格式是否正确
  if (!idCardRegex.test(textArr[2])) {
    ElMessage({
      message: '身份证号格式错误',
      type: 'error'
    })
    return
  }
  let externalUserList = [{
    realName: textArr[0],
    phoneNumber: textArr[1],
    realId: textArr[2]
  }]
  request
    .post(userApi.createExternalInsurance, {
      externalUserList: externalUserList,
      customerSource: '非营探人员投保',
      productId: route.params.id,
      providerId: store.providerId,
      accidentInsuranceGradeId: schemeRadio.value == 0 ? null : schemeRadio.value
    }, {
      loading: true
    })
    .then(r => {
      if (r.Code == 200) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getInsuredPersonList()
        addInsuranceShow.value = false
      }
    })
}

// 立即支付
const goPay = () => {
  request
    .post(userApi.getExternalInsurance, {
      currentPage: pageNum.value,
      pageSize: pageSize.value,
      productId: product.value.multigroupProductType == 'MULTIGROUP_PARENT' ? scheduleRadio.value : route.params.id,
      providerId: store.providerId,
      externalUserInsuranceType: 'LIABILITY_INSURANCE',
      status: 'NOT_INSURE_YET'
    }, {
      loading: true
    })
    .then(r => {
      if (r.details.list.length > 0) {
        router.push(`/user/workbench/verifyinsurance/${product.value.multigroupProductType == 'MULTIGROUP_PARENT' ? scheduleRadio.value : route.params.id}/${scheduleRadio.value || route.params.id}`)
      } else {
        ElMessage({
          message: '当前没有未支付人员',
          type: 'error'
        })
        return
      }
    })
}

// 判断活动是否过期
const isDateBeforeToday = (dateString) => {
  // 将输入的日期字符串转换为 Date 对象
  const inputDate = new Date(dateString)
    
  // 获取今天的日期
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 将时间部分设为0，只比较日期部分
    
  // 比较输入日期和今天的日期
  return inputDate < today
}

const getInsuredPersonList = (val) => {
  request
    .post(userApi.getExternalInsurance, {
      currentPage: val ? val.page : pageNum.value,
      pageSize: pageSize.value,
      productId: product.value.multigroupProductType == 'MULTIGROUP_PARENT' ? scheduleRadio.value : route.params.id,
      providerId: store.providerId,
      externalUserInsuranceType: 'LIABILITY_INSURANCE',
    }, {
      loading: true
    })
    .then(r => {
      insuredPersonList.value = r.details.list
      total.value = r.details.total
    })
}

const handleSuccess = ({results, header}) => {
  tableData.value = results
  tableHeader.value = header

  if (tableData.length == 0) {
    ElMessage.error('导入异常，请重新导入')
    return
  }

  let table = tableData.value.map(item => ({
    realName: item['姓名'],
    phoneNumber: item['手机号'],
    realId: item['身份证号']
  }))

  // 判断手机号格式是否正确
  const phoneRegex = /^1[3-9]\d{9}$/
  // 判断身份证号格式是否正确
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}([0-9Xx])$/
  externalUserList.value = table.filter(item => {
    return phoneRegex.test(item.phoneNumber) && idCardRegex.test(item.realId)
  })
  step.value ++
}

const formatCellText = (row, column) => {
  console.log(row);
  console.log(column);
  // 判断手机号格式是否正确
  const phoneRegex = /^1[3-9]\d{9}$/
  // 判断身份证号格式是否正确
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}([0-9Xx])$/
  
  return ((column.label == '身份证号' && !idCardRegex.test(row['身份证号'])) || (column.label == '手机号' && !phoneRegex.test(row['手机号']) )) ?  `<span style="color: red;">${row[column.property]}</span>` : `<span>${row[column.property]}</span>`;
}

const goNext = (e) => {
  if (e == 1) {
    // 下一步
    if (tableData.value.length == 0) {
      ElMessage.error('请先上传excel文件')
      return
    }
    step.value ++
  } else {
    // 确认
    let table = tableData.value.map(item => ({
      realName: item['姓名'],
      phoneNumber: item['手机号'],
      realId: item['身份证号']
    }))
    // 判断手机号格式是否正确
    const phoneRegex = /^1[3-9]\d{9}$/
    // 判断身份证号格式是否正确
    const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}([0-9Xx])$/
    let externalUserList = table.filter(item => {
      return phoneRegex.test(item.phoneNumber) && idCardRegex.test(item.realId)
    })
    request.post(userApi.createExternalInsurance, {
      externalUserList: externalUserList,
      customerSource: '非营探人员投保',
      productId: route.params.id,
      providerId: store.providerId,
      accidentInsuranceGradeId: schemeRadio.value == 0 ? null : schemeRadio.value
    }, {
      loading: true
    })
    .then(r => {
      if (r.Code == 200) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getInsuredPersonList()
        step.value = 1
        addInsuranceShow.value = false
      }
    })
  }
}

onMounted(() => {
  // 获取保险挡位列表
  request.post(userApi.getInsuranceGrade, {
    insuranceType: 'LIABILITY'
  }).then(res => {
    liabilityGradeList.value = res.details
  })
  request.post(userApi.getInsuranceGrade, {
    insuranceType: 'ACCIDENT'
  }).then(res => {
    accidentGradeList.value = res.details
  })
  request
    .post(userApi.getProduct, {
      productId: route.params.id
    }, {
      loading: true
    })
    .then(r => {
      product.value = r.details
      if (r.details.multigroupProductType == 'MULTIGROUP_PARENT') {
        scheduleRadio.value = r.details.groupPeriodList[0].subProductId
      }
      getInsuredPersonList()
      productShow.value = true
    })
});
</script>

<style lang="scss" scoped>
.schedule-container {
	padding: 20px 24px;
	.container-title {
		color: rgba(89, 89, 89, 1);
		font-size: 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
	}
  .container-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container-box {
		margin: 20px 0;
		background-color: #fff;
		padding: 15px 20px;
	}
  .container-item {
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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
.add-insurance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-insurance-box {
  box-sizing: border-box;
  width: 100%;
  min-height: 240px;
  border-radius: 6px;
  border: 1.4px solid transparent;
  background: linear-gradient(white,white) padding-box,
  repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.5em,white 0,white 0.75em);
  // border: 1px dashed rgba(191, 191, 191, 1);
  margin-top: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.policyholder-text {
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 140px;
  margin-bottom: 20px;
  white-space: pre-line;
  line-height: 1.5;
  overflow: auto;
}
.policyholder-text:focus-visible {
  outline: none;
}
.policyholder-text:empty:before{
  content: attr(placeholder);
  color:#bbb;
}
</style>
<style lang="scss">
.container-box {
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
