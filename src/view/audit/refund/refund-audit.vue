<template>
  <div class="commodity">
    <div class="tool-bar">
      <el-tabs v-model="activeTab"  @tab-change="tabChange">
        <el-tab-pane label="全部" name="REFUNDING/REFUND_REVIEW/REFUNDED"></el-tab-pane>
        <el-tab-pane label="退款中" name="REFUNDING"></el-tab-pane>
        <el-tab-pane label="退款待审核" name="REFUND_REVIEW"></el-tab-pane>
        <el-tab-pane label="已退款" name="REFUNDED"></el-tab-pane>
      </el-tabs>
      <div class="search-bar">
        <el-input
          style="width: 400px"
          v-model="searchWord"
          placeholder="请输入"
          class="input-with-select">
          <template #prepend>
            <el-select v-model="selectTag" style="width: 115px">
              <el-option label="订单编号" value="1" />
              <el-option label="商品ID" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>
    </div>
    <el-table :data="tableData" style="width: 98%" height="auto">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="snapshot.id" fixed="left" label="序号" width="70" />
      <el-table-column prop="" label="订单信息" width="270">
        <template #default="scope">
          <div>
            <div>订单编号：{{ scope.row.snapshot?.orderCode }}</div>
            <div>注册用户：{{ scope.row.snapshot?.directContactName }}</div>
            <div>交易流水号：{{ scope.row.snapshot?.dealId }}</div>
            <div>下单时间：{{ scope.row.createTime }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="商品信息" width="360">
        <template #default="scope">
          <img src="../../../assets/0.png" style="width: auto; height: 86px" />
          <div style="float: right">
            <div>商品ID号：{{ scope.row.snapshot?.productId }}</div>
            <div>商品名称：{{ scope.row.snapshot?.product.fullName }}</div>
            <div>活动开始时间：{{ scope.row.snapshot?.product?.activityStartDateTime }}</div>
            <div>活动天数：{{ calculateDays(scope.row.snapshot?.product?.activityStartDateTime,scope.row.snapshot?.product?.activityEndDateTime) + 1 }}</div>
            <div>成团状态：{{ scope.row.snapshot?.product?.clusterStatus == 'NOT_CLUSTER' ? '未成团' : '已成团' }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="订单状态" width="100" align="center" :filters="[
        { text: '待支付', value: 'PENDING_PAYMENT' },
        { text: '未通过', value: 'REFUNDING' },
        { text: '待成团', value: 'WAIT_CLUSTERING' },
        { text: '待出行', value: 'CLUSTERED' },
        { text: '活动中', value: 'ACTIVE' },
        { text: '已支付', value: 'PAID' },
        { text: '已取消', value: 'CANCELED' },
        { text: '已完成', value: 'COMPLETE' },
        { text: '已退款', value: 'REFUNDED' },
        { text: '异常订单', value: 'ABNORMAL' },
        { text: '退款审核中', value: 'REFUND_REVIEW' },
        { text: '退款中', value: 'REFUNDING' }
      ]" filter-placement="bottom-end">
        <template #default="scope">
          <el-tooltip placement="bottom" effect="light" :raw-content="true"
            :v-if="scope.row.snapshot?.orderStatus === '' ? true : false">
            <template #content>
              <h3>未通过原因：</h3>
              点击鼠标移入元素，弹出气泡式的卡片浮层。{{
}}
            </template>
            <el-tag :type="getorderStatus(scope.row.snapshot?.orderStatus)" disable-transitions>
              {{ getorderTagName(scope.row.snapshot?.orderStatus) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="出行人信息" width="270">
        <template #default="scope">
          <div>
            <div>出行人：{{ scope.row.snapshot?.directContactName }}</div>
            <div>手机号码： {{ scope.row.snapshot?.directContactMobile }}</div>
            <div>身份证号：{{ scope.row.snapshot?.userId }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="联系人信息" width="270">
        <template #default="scope">
          <div>
            <div>联系人：{{ scope.row.snapshot?.directContactName }}</div>
            <div>手机号码：{{ scope.row.snapshot?.directContactMobile }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="订单金额" width="250">
        <template #default="scope">
          <div>
            <div>销售标价：{{ formatPrice(scope.row.unitPrice) }} (单价)</div>
            <div>优惠总额：{{ scope.row.originalTotalPrice - scope.row.discountPrice }}</div>
            <div>实付金额：{{ scope.row.totalPrice }}</div>
            <div>支付方式：{{ scope.row.outTradeNo }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="保险明细" width="250">
        <template #default="scope">
          <div>
            <div>保险总额：{{ scope.row.insuranceName }}</div>
            <div>组织者责任险：{{ scope.row.insurancePrice }}</div>
            <div>人身意外险：{{ scope.row.insuranceNum }}</div>
          </div>
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
          <div>
            <div>促销方式：{{ scope.row.couponName }}</div>
            <div>优惠金额：{{ scope.row.couponAmount }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200" class="operate" prop="info">
        <template #default="scope">
          <div class="controllers">
            <el-button v-if="scope.row.snapshot?.orderStatus == 'REFUND_REVIEW' || scope.row.snapshot?.orderStatus == 'REFUNDING'" @click="showRefundDrawer(scope.row.snapshot?.product?.providerId, scope.row.snapshot?.id, scope.row.snapshot?.directContactName, scope.row.snapshot?.directContactMobile, scope.row.workTicketId)">查看退款信息</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <RefundDrawer ref="refundDrawerRef" @change-page="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchWord = ref('')
const selectTag = ref('')
const activeTab = ref('first')
import { userApi } from '../../../api/modules/user/user'
import { request } from '../../../api'
import { onMounted } from 'vue'
import { useStore } from '../../../store'
import RefundDrawer from '../../user/workbench/manager-ordering/components/RefundDrawer.vue'
import OrderTab from '../../user/workbench/manager-ordering/components/OrderTab.vue'
const store = useStore()
const materialDialogRef = ref(null)
const applicationDrawerRef = ref(null)
const refundDrawerRef = ref(null)
const selectStatus = ref(['REFUNDING','REFUND_REVIEW','REFUNDED'])
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

const tabChange = (name) => {
  let activeTabList = name == "" ? null : name.split("/")
  selectStatus.value = activeTabList
  handleCurrentChange(1);
}

const handleSearch = () => {
  handleCurrentChange(1);
};

const calculateDays = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const diffInMillies = Math.abs(endDate - startDate);
  return Math.floor(diffInMillies / (1000 * 60 * 60 * 24));
}

const formatPrice = (priceInCent) => {
  const yuan = Math.floor(priceInCent / 100);
  const cent = priceInCent % 100;
  return yuan + '.' + (cent < 10 ? '0' + cent : cent);
}

// 分页查询
const handleCurrentChange = (next = 1, pageSize = 10) => {
  console.log(store.user);
  request
    .post(userApi.orderList, {
      currentPage: next,
      pageSize: pageSize,
      userId: store.user.id,
      // 商品ID
      productId: selectTag == 2 ? searchWord.value : '',
      // 订单编号,非必须
      orderCode: selectTag == 1 ? searchWord.value : '',
      providerId: store.providerId,
      orderStatuses: selectStatus.value,
      sortParam: {
        sort: "id",
        sortOrder: "DESC"
      },
    })
    .then(res => {
      tableData.value = res.details.list
      totalPage.value = res.details.total
    })
}
// 查看报名表
const showRegisterDrawer = (id, userId, productId) => {
  applicationDrawerRef.value.getInfo(id, userId, productId)
}
// 查看退款信息
const showRefundDrawer = (providerId, orderId, name, phone, workTicketId) => {
  refundDrawerRef.value.getInfo(providerId, orderId, name, phone, workTicketId)
}
// 订单审核通过
const confirmOrder = id => {
  request.post(userApi.confirmOrder, { orderId: id }, { message: true }).then(handleCurrentChange())
}
const refuseOrder = id => {
  request.post(userApi.refuseOrder, { orderId: id }, { message: true }).then(handleCurrentChange())
}
const showMaterialDialog = id => {
  materialDialogRef.value.getInfo(id)
}
onMounted(() => {
  handleCurrentChange()
  // 订单状态数据
  request
    .post(userApi.ordersInfo, {
      providerId: store.providerId,
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
    case 'WAIT_CLUSTERING':
      return 'success'
    case 'CLUSTERED':
      return 'success'
    case 'ACTIVE':
      return 'success'
    case 'ABNORMAL':
      return 'danger'
    case 'AFTER_SALES':
      return 'warning'
    case 'REFUND_REVIEW':
      return 'warning'
    case 'PENDING_PAYMENT':
      return 'warning'
    case 'REFUNDING':
      return 'warning'
    case 'CANCELED':
      return ''
    case 'REFUNDED':
      return ''
    default:
      return 'warning'
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
    case 'CANCELED':
      return '已取消'
    case 'WAIT_CLUSTERING':
      return '待成团'
    case 'CLUSTERED':
      return '待出行'
    case 'ACTIVE':
      return '活动中'
    case 'AFTER_SALES':
      return '售后中'
    case 'REFUND_REVIEW':
      return '退款待审核'
    case 'REFUNDING':
      return '退款中'
    case 'REFUNDED':
      return '已退款'
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
.tool-bar {
  margin-left: 24px;
  padding: 20px;
  background-color: #ffffff;
}
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
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
  margin-right: 20px;
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
