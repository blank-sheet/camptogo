<template>
  <div class="commodity">
    <h2>订单管理</h2>
    <CampDataShow :datas="datas" />
    <OrderTab />
    <el-table :data="tableData" style="width: 98%" height="auto">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" fixed="left" label="序号" width="70" />
      <el-table-column prop="" label="订单信息" width="270">
        <template #default="scope">
          <div>订单编号：{{ scope.row.orderId }}</div>
          <div>注册用户：{{ scope.row.campers }}</div>
          <div>交易流水号：{{ scope.row.outTradeNo }}</div>
          <div>下单时间：{{ scope.row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="商品信息" width="240">
        <template #default="scope">
          <img src="../../../../assets/0.png" style="width: auto; height: 86px" />
          <div style="float: right">
            <div>商品ID号：{{ scope.row.productId }}</div>
            <div>商品名称：{{ scope.row.orderId }}</div>
            <div>活动开始时间：{{ scope.row.orderId }}</div>
            <div>活动天数：{{ scope.row.orderId }}</div>
            <div>成团状态：{{ scope.row.orderId }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="订单状态" width="110" :filters="[
        { text: '未通过', value: 'XXX' },
        { text: '已通过', value: 'XXX' },
        { text: '待审核', value: 'XXX' },
        { text: '已付款', value: 'PAID' },
        { text: '审核中', value: 'Office' },
        { text: '已取消', value: 'Office' },
        { text: '已完成', value: 'COMPLETE' },
        { text: '已退款', value: 'Office' },
        { text: '异常订单', value: 'ABNORMAL' },
        { text: '退款审核中', value: 'XXX' },
        { text: '退款中', value: 'REFUNDING' }
      ]" filter-placement="bottom-end">
        <template #default="scope">
          <el-tooltip placement="bottom" effect="light" :raw-content="true"
            :v-if="scope.row.orderStatus === '' ? true : false">
            <template #content>
              <h3>未通过原因：</h3>
              点击鼠标移入元素，弹出气泡式的卡片浮层。{{
}}
            </template>
            <el-tag :type="getorderStatus(scope.row.orderStatus)" disable-transitions>
              {{ getorderTagName(scope.row.orderStatus) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="出行人信息" width="270">
        <template #default="scope">
          <div>出行人：{{ scope.row.directContactName }}</div>
          <div>手机号码： {{ scope.row.directContactMobile }}</div>
          <div>身份证号：{{ scope.row.userId }}</div>
          <div>联系人：{{ scope.row.directContactName }}</div>
          <div>手机号码：{{ scope.row.directContactMobile }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="订单金额" width="250">
        <template #default="scope">
          <div>销售标价：{{ scope.row.unitPrice }} (单价)</div>
          <div>优惠总额：{{ scope.row.originalTotalPrice - scope.row.discountPrice }}</div>
          <div>实付金额：{{ scope.row.totalPrice }}</div>
          <div>支付方式：{{ scope.row.outTradeNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="保险明细" width="250">
        <template #default="scope">
          <div>保险总额：{{ scope.row.insuranceName }}</div>
          <div>组织者责任险：{{ scope.row.insurancePrice }}</div>
          <div>人身意外险：{{ scope.row.insuranceNum }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="付款状态" width="100" :filters="[
        { text: '已付款', value: 'yes' },
        { text: '未付款', value: 'no' }
      ]" filter-placement="bottom-end">
        <template #default="scope">
          <span>{{ scope.row.status === 'PAID' ? '已支付' : '未支付' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="优惠明细（隐藏）" width="220">
        <template #default="scope">
          <div>促销方式：{{ scope.row.couponName }}</div>
          <div>优惠金额：{{ scope.row.couponAmount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200" class="operate" prop="info">
        <template #default="scope">
          <div class="controllers">
            <el-button @click="confirmOrder(scope.row.id)">订单审核通过</el-button>
            <el-button @click="refuseOrder(scope.row.id)">订单审核不通过</el-button>
            <el-button @click="showRegisterDrawer">查看报名表</el-button>
            <el-button @click="showRefundDrawer">查看退款信息</el-button>
            <el-button @click="showMaterialDialog">联系客服补充材料</el-button>
            <el-button v-if="scope.row.orderStatus === '异常' ? true : false">查看异常信息</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <ApplicationDrawer ref="applicationDrawerRef" />
    <RefundDrawer ref="refundDrawerRef" />
    <MaterialDialog ref="materialDialogRef" />
    <OrderFefuseDialog />
    <CampPagination :total="totalPage" @change-page="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CampDataShow from '../../../../component/camp-data-show.vue'
import { userApi } from '../../../../api/modules/user/user'
import { request } from '../../../../api'
import { onMounted } from 'vue'
import { useStore } from '../../../../store'
import ApplicationDrawer from './components/ApplicationDrawer.vue'
import RefundDrawer from './components/RefundDrawer.vue'
import CampPagination from '../../../../component/camp-pagination.vue'
import MaterialDialog from './components/MaterialDialog.vue'
import OrderTab from './components/OrderTab.vue'
import OrderFefuseDialog from './components/OrderFefuseDialog.vue'
const store = useStore()
const materialDialogRef = ref(null)
const applicationDrawerRef = ref(null)
const refundDrawerRef = ref(null)
const datas = ref([
  {
    label: '未完订单',
    value: 0
  },
  {
    label: '待审核订单',
    value: 0
  },
  {
    label: '退款订单',
    value: 0
  },
  {
    label: '异常订单',
    value: 0
  }
])
const totalPage = ref(10)
const tableData = ref([])

// 分页查询
const handleCurrentChange = (next = 1, pageSize = 10) => {
  console.log('123')
  request
    .post(userApi.ordersSearch, {
      currentPage: next,
      pageSize: pageSize,
      // 商品ID
      productId: '',
      // 订单编号,非必须
      orderCode: ''
    })
    .then(res => {
      tableData.value = res.details.list
      totalPage.value = res.details.total
    })
}
// 查看报名表
const showRegisterDrawer = () => {
  applicationDrawerRef.value.getInfo()
}
// 查看退款信息
const showRefundDrawer = () => {
  refundDrawerRef.value.getInfo()
}
// 订单审核通过
const confirmOrder = id => {
  request.post(userApi.confirmOrder, { orderId: id }, { message: true }).then(handleCurrentChange)
}
const refuseOrder = id => {
  request.post(userApi.refuseOrder, { orderId: id }, { message: true }).then(handleCurrentChange)
}
const showMaterialDialog = () => {
  materialDialogRef.value.getInfo()
}
onMounted(() => {
  handleCurrentChange()
  // 订单状态数据
  request
    .post(userApi.ordersInfo, {
      providerId: store.providerId
    })
    .then(res => {
      const resp = res.details[0]
      datas.value[0].value = resp.pendingPaymentCount
      datas.value[1].value = resp.refundReviewCount
      datas.value[2].value = resp.refundingCount
      datas.value[3].value = resp.abnormalCount
    })
})

const getorderStatus = status => {
  switch (status) {
    case 'PAID':
      return 'success'
    case 'COMPLETE':
      return 'success'
    case 'ABNORMAL':
      return 'warning'
    default:
      return 'danger'
  }
}
const getorderTagName = status => {
  switch (status) {
    case 'PAID':
      return '已支付'
    case 'COMPLETE':
      return '已完成'
    case 'PENDING_PAYMENT':
      return '待付款'
    case 'ABNORMAL':
      return '异常订单'
    case 'REFUNDING':
      return '退款中'
    default:
      return status
  }
}
</script>
<script>
const options = [
  {
    lable: '立即成团',
    value: ''
  },
  {
    lable: '申请结算',
    value: ''
  },
  {
    lable: '商品下架',
    value: ''
  },
  {
    lable: '立即开售',
    value: ''
  },
  {
    lable: '立即停售',
    value: ''
  }
]
</script>
<style lang="scss" scoped>
h2 {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}

.el-popper__arrow {
  display: none;
}

.s-thead {
  font-size: smaller;

  .desc {
    color: #727272;
    position: absolute;
    left: 25px;
    bottom: -2px;
  }
}

.el-table__header {
  height: 50px;
}

div.commodity {
  border-radius: 5px;

  .el-table {
    --el-table-header-bg-color: #f5f5f5;
    margin-left: 24px;

    .cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  thead {
    color: #000000;
  }

  .el-tabs__nav-wrap::after {
    height: 0px;
  }
}

.controllers {
  display: flex;
  width: 200px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .el-button {
    margin: 0;
    min-width: 50%;
    font-size: small;
    border: none;
    justify-content: flex-start;
    color: #93d900;
    background: none;
  }
}

.title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}

.el-radio-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  margin-left: 30px;
}

.el-pagination {
  margin-top: 20px;
  margin-left: 24px;
}
</style>
