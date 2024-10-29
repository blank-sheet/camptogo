<template>
  <div class="schedule-container">
		<div class="container-box">
      <div class="container-item">
        <div class="container-title">保险价格确认及支付</div>
      </div>
      <div class="container-info">
        <el-form :inline="true" :model="formInline" label-width="auto">
          <el-form-item label="商品名称：">
            {{ product.fullName }}
          </el-form-item>
          <el-form-item label="团期：">
            <span>{{ product.multigroupProductType == 'MULTIGROUP_PARENT' ? 
              (product?.groupPeriodList.find(i => i.subProductId == subProductId)?.activityTimeRange[0]?.substring(0, 10) + ' - ' + product?.groupPeriodList.find(i => i.subProductId == subProductId)?.activityTimeRange[1]?.substring(0, 10)) : 
              (product.activityStartDateTime?.substring(0, 10) + ' - ' + product.activityEndDateTime?.substring(0, 10)) }}</span>
          </el-form-item>
          <el-form-item label="商品状态：">
            {{ getProductStatus(product.productStatus) }}
          </el-form-item>
        </el-form>
      </div>
      <div class="container-item" style="border-bottom: none;">
        <div class="container-title">
          <span>全部添加出行人投保信息</span>
        </div>
        <el-table :data="insuredPersonList" class="user-table" style="width: 100%; margin-top: 20px;">
          <el-table-column prop="realName" label="姓名" :width="200" />
          <el-table-column prop="realId" label="身份证号" />
          <el-table-column prop="phoneNumber" label="手机号" />
          <el-table-column prop="customerSource" label="来源" />
          <el-table-column prop="accidentOption" label="人身意外险方案">
            <template #default="scope">
              {{ scope.row.accidentInsuranceId ? accidentGradeList.find(i => i.insuranceGradeId == scope.row.accidentInsuranceGradeId)?.title : '不赠送人身意外险' }}
            </template>
          </el-table-column>
          <el-table-column prop="accidentPrice" label="意外险价格">
            <template #default="scope">
              {{ (scope.row.accidentInsurancePremium * scope.row.activityDays / 100).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="accidentOption" label="组织者责任险方案">
            <template #default="scope">
              {{ liabilityGradeList.find(i => i.insuranceGradeId == scope.row.liabilityInsuranceGradeId)?.title }}
            </template>
          </el-table-column>
          <el-table-column prop="accidentPrice" label="责任险价格">
            <template #default="scope">
              {{ (scope.row.liabilityInsurancePremium * scope.row.activityDays / 100).toFixed(2) }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createTime" label="创建时间" /> -->
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="pageNum" :update:page="(val) => pageNum = val" 
          v-model:limit="pageSize" :update:limit="(val) => pageSize = val" @pagination="getInsuredPersonList"></pagination>
        
        <div class="total-price">共计：<span>{{ (totalAmount/100).toFixed(2) }}</span>元</div>
        <div class="total-price" style="margin-top: 16px;">注：您为非营探平台报名人员投保，无法享受营探平台提供的补贴优惠。</div>
        <div class="payment-method">
          <div class="payment-title">支付方式</div>
          <div class="payment-img">
            <span>请使用</span>
            <img src="../../../../assets/zhifu.png" alt="">
            <span>支付</span>
          </div>
        </div>
        <div class="go-btns">
          <el-button @click="router.go(-1)">返回</el-button>
          <el-button type="primary" @click="payment">一键支付</el-button>
        </div>
      </div>

      <!-- 支付弹窗 -->
      <el-dialog class="dialog" v-model="paymentShow" title="保险价格确认及支付" width="800" align-center :show-close="true" @close="closePayment" :close-on-click-modal="false">
        <div v-if="!isPay">
          <div class="payment-price">订单金额：<span>{{ (practicalPrice/100).toFixed(2) }}</span>元</div>
          <div class="payment-code-img">
            <img :src="qrCodeImg" alt="">
          </div>
          <div class="payment-method-box">
            请使用
            <img src="../../../../assets/zhifu.png" alt="">
            扫码支付
          </div>
          <div class="payment-text" v-if="timer > 0">
            二维码有效期剩余
            <span>{{ formatTime(timer) }}</span>
          </div>
          <div class="payment-text" v-else>
            支付二维码已过期，请点击<a @click="getPaymentInfo">立即刷新</a>
          </div>
          <div class="payment-text">支付即表示您已阅读并同意<a>《营探服务商费用核算与结算办法》</a></div>
        </div>
        <div class="payment-success" v-else>
          <img class="payment-success-img" src="../../../../assets/success.png" alt="">
          <div class="payment-success-text">支付成功</div>
          <div class="payment-tip">*请在“商品管理-添加查看出行人投保信息”中查看全部出行人投保信息</div>
          <div class="payment-buttons">
            <el-button @click="router.go(-1)">再次添加</el-button>
            <el-button type="primary">查看详情</el-button>
          </div>
        </div>
      </el-dialog>
		</div>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import pagination from '../../../../component/pagination.vue'
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
const liabilityGradeList = ref([])
const accidentGradeList = ref([])
const scheduleRadio = ref(null)
const subProductId = ref(null)
const totalAmount = ref(0)
const slideValue = ref("0");
const insuredPersonList = ref([])
const paymentShow = ref(false)
const qrCodeImg = ref(null)
const practicalPrice = ref(null)
const timer = ref(180)
const orderId = ref(null)
const isPay = ref(true)
const intervalId = ref(null)

const getInsuredPersonList = (val) => {
  request
    .post(userApi.getExternalInsurancePrice, {
      currentPage: val ? val.page : pageNum.value,
      pageSize: pageSize.value,
      productId: route.params.subProductId,
      providerId: store.providerId
    }, {
      loading: true
    })
    .then(r => {
      insuredPersonList.value = r.details.page.list
      total.value = r.details.page.total
      totalAmount.value = r.details.totalAmount
    })
}

const payment = () => {
  getPaymentInfo().then(() => {
    paymentShow.value = true
  })
}

const closePayment = () => {
  if (isPay.value) {
    clearInterval(intervalId.value)
  } else {
    clearInterval(intervalId.value)
    paymentShow.value = false
  }
}

const getPaymentInfo = () => {
  return new Promise((resolve, reject) => {
    request.post(userApi.comfirmExternalInsurance, {
      providerId: store.providerId,
      selectAll: true,
      developerKey: "camptogo2024&DEVELOPER_KEY&*&!^@%*&^%"
    })
    .then(res => {
      // 处理响应结果
      qrCodeImg.value = res.details.qrCodeUrl // 有效期三分钟
      practicalPrice.value = res.details.totalAmount
      orderId.value = res.details.orderId
      startCountdown()
      resolve(); // 调用resolve来完成Promise
    })
    .catch(error => {
      // 处理错误
      console.error('请求失败:', error);
      reject(error); // 调用reject来拒绝Promise
    })
  })
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

// 倒计时三分钟
const startCountdown = () => {
  clearInterval(intervalId.value)
  timer.value = 180
  intervalId.value = setInterval(() => {
    // 每次递减1秒
    timer.value--;
    console.log(`剩余时间：${timer.value}秒`);
    request.post(userApi.getPaymentStatus, {
      orderId: orderId.value,
      providerId: store.providerId
    }).then(res => {
      if (res.details) {
        clearInterval(intervalId.value)
        isPay.value = true
      }
    })

    if (timer.value <= 0) {
      clearInterval(intervalId.value); // 清除定时器
      console.log('二维码过期');
    }
  }, 1000) // 每秒执行一次
}

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})

onMounted(() => {
  subProductId.value = route.params.subProductId
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
    })
    getInsuredPersonList()
});
</script>

<style lang="scss" scoped>
.schedule-container {
	padding: 20px 24px;
	.container-title {
		color: rgba(89, 89, 89, 1);
		font-size: 16px;
    // margin-bottom: 12px;
    display: flex;
    align-items: center;
	}
  .container-info {
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 12px 20px;
    margin-top: 20px;
  }
  .container-box {
		margin: 20px 0;
		background-color: #fff;
		padding: 15px 20px;
	}
  .container-item {
    padding: 20px 0;
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
.add-insurance-box {
  box-sizing: border-box;
  width: 100%;
  height: 240px;
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
.payment-price {
  text-align: center;
  font-size: 16px;
  color: rgba(88, 88, 88, 1);
  span {
    color: rgba(255, 152, 69, 1);
    font-size: 36px;
  }
}
.payment-code-img {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 240px;
    height: 240px;
  }
}
.payment-method-box {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  img {
    width: 30px;
    height: 28px;
    margin: 0 4px;
    margin-top: 4px;
  }
}
.payment-text {
  font-size: 14px;
  color: rgba(138, 138, 138, 1);
  text-align: center;
  margin-top: 10px;
  a {
    color: #93D600;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    color: #3a3a3a;
  }
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
.total-price {
  font-size: 16px;
  color: rgba(138, 138, 138, 1);
  span {
    font-size: 20px;
    color: rgba(88, 88, 88, 1);
    margin-right: 5px;
  }
}
.go-btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
}
.payment-method {
  width: 200px;
  margin-top: 24px;
  .payment-title {
    font-size: 16px;
    color: rgba(89, 89, 89, 1);
  }
  .payment-img {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 12px 16px;
    margin-top: 20px;
    border: 1px solid rgba(212, 212, 212, 1);
    border-radius: 6px;
    img {
      width: 30px;
      height: 28px;
      margin: 0 5px -4px;
    }
  }
}
.payment-success {
  display: flex;
  align-items: center;
  flex-direction: column;
  .payment-success-img {
    width: 100px;
    height: 100px;
  }
  .payment-success-text {
    font-size: 20px;
    color: rgba(0, 0, 0, 1);
    margin-top: 20px;
  }
  .payment-tip {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(138, 138, 138, 1);
  }
  .payment-buttons {
    margin-top: 40px;
  }
}
</style>
<style lang="scss">
.user-table {
  th.is-leaf.el-table__cell {
    background-color: #f2f2f2 !important;
    padding: 10px 0 !important;
  }
  td.el-table__cell {
    background-color: #fafafa !important;
  }
}
</style>