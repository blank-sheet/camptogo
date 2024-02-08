<template>
  <div class="product-audit">
    <header>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部商品" name=""></el-tab-pane>
        <el-tab-pane label="待审核" name="REVIEW"></el-tab-pane>
        <el-tab-pane label="已通过" name="APPROVAL"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="DECLINE"></el-tab-pane>
      </el-tabs>
      <div style="display: flex; margin: 20px 0">
        <el-input v-model="searchInfo.keyword" placeholder="服务商名称/商品id" />
        <el-select
          multiple
          v-model="searchInfo.productStatus"
          placeholder="商品状态"
          style="margin: 0 20px">
          <el-option
            v-for="status in Object.keys(PRODUCT_STATUS)"
            :label="PRODUCT_STATUS[status]"
            :value="PRODUCT_STATUS[status]" />
        </el-select>
        <div>
          <el-button>重置</el-button>
          <el-button type="primary" @click="updateList(pageNum)">查询</el-button>
        </div>
      </div>
    </header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="70">
        <template #default="scope">{{ scope.row.index || 0 }}</template>
      </el-table-column>
      <el-table-column label="商品ID" width="180">
        <template #default="scope"
          ><span>{{ scope.row.snapshot.identifier }}</span></template
        >
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template #default="scope">
          {{ scope.row.snapshot.createTime?.split('.')[0]?.replace('T', '  ') }}</template
        >
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180">
        <template #default="scope">
          <span>{{ scope.row.snapshot.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请类型" width="180">
        <template #default="scope">
          <span>{{ OPERATION_TYPES[scope.row.operation] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="180">
        <template #default="scope">
          <span>{{ getProductStatus(scope.row.snapshot.productStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="80">
        <template #default="scope">
          <el-button type="primary" v-show="scope.row.snapshot.productId">
            <a
              :href="
                'http://localhost:5173/#/user/workbench/product/' + scope.row.snapshot.productId
              "
              target="_blank"
              >查看</a
            >
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="申请类型" width="160">
        <template #default="scope">
          <span>{{ OPERATION_TYPES[scope.row.operation] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <template v-if="scope.row.status === 'REVIEW'">
            <el-button type="success" @click="approve(scope.row.workTicketId)">通过</el-button>
            <el-button @click="reject(scope.row.workTicketId)">拒绝</el-button>
          </template>
          <template v-else-if="scope.row.status === 'APPROVAL'"><span>已通过</span></template>
          <template v-else><span>已拒绝</span></template>
        </template>
      </el-table-column>
    </el-table>
    <camp-pagination @change-page="updateList" :total="total"></camp-pagination>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, h } from 'vue'
import { request } from '../../../api'
import { auditApi } from '../../../api/modules/audit'
import CampPagination from '../../../component/camp-pagination.vue'
import { getProductStatus, PRODUCT_STATUS } from '../../../utils/getProductStatus'
import { ElMessage, ElMessageBox } from 'element-plus'
const tableData = ref([
  {
    workTicketId: 2,
    operation: 'CREATE_PRODUCT',
    creatorUserId: 0,
    creatorType: 'PROVIDER',
    createRemark: null,
    status: 'REVIEW',
    entityType: 'PRODUCT',
    entityId: 4837,
    reviewUserId: null,
    reviewRemark: null,
    reviewTime: null,
    createTime: '2023-07-11T17:34:23.874+0000',
    snapshot: {
      productId: 4837,
      identifier: 'QfCdc297f570714165bccdb5',
      fullName: '测试创建商品',
      parentProductId: 0,
      multigroupProductType: 'MULTIGROUP_PARENT',
      createTime: '2023-07-11T17:34:23.854+0000',
      priceOriginal: 100000.0,
      priceSelling: 50000.0,
      productStatus: 'CREATED_WAIT_REVIEW',
      providerId: 1,
      horizontalShowsResourceList: null,
      activityLocation: null
    }
  }
])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const reviewRemark = ref('')
const activeTab = ref('')
const searchInfo = reactive({
  operation: undefined,
  statuses: undefined,
  createTimeStart: undefined,
  createTimeEnd: undefined,
  //服务商名称商品ID(合并为一个)
  keyword: undefined,
  productStatus: []
})
watch(activeTab, () => {
  searchInfo.statuses = [activeTab.value].filter(Boolean)
  updateList(pageNum.value)
})
const updateList = (currentPage = 1, pageSize = 10) => {
  request
    .post(auditApi.productList, {
      currentPage,
      pageSize,
      ...searchInfo
    })
    .then(v => {
      total.value = v.details.total
      tableData.value = v.details.list?.map((l, i) => ({ ...l, index: i + 1 })),
      pageNum.value = v.details.pageNum
    })
}
const approve = (id = 0) => {
  ElMessageBox.confirm(
    '确认通过该商品吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      request
      .post(
        auditApi.productApprove,
        {
          workTicketId: id,
          reviewRemark: '通过'
        },
        {
          message: true
        }
      )
      .then(() => updateList(pageNum.value))
    })
    .catch(() => {
      
    })
}
const reject = (id = 0) => {
  // ElMessageBox.prompt(
  //   '确认拒绝该商品吗?',
  //   '提示',
  //   {
  //     confirmButtonText: '确认',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   }
  // )
  //   .then((value) => {
  //     request
  //     .post(
  //       auditApi.productOrInsurenceReject,
  //       {
  //         workTicketId: id,
  //         reviewRemark: value
  //       },
  //       {
  //         message: true
  //       }
  //     )
  //     .then(() => updateList())
  //   })
  //   .catch(() => {
      
  //   })
  ElMessageBox({
    title: '拒绝',
    message: h(
      "div",
      {
        class: "el-textarea"
      },
      [
        h("textarea", {
          placeholder: "请输入审核建议",
          class: "el-textarea__inner",
          autocomplete: "off",
          rows: 5,
          id: "commentContent",
          value: reviewRemark.value,
          onInput: onCommentInputChange
        })
      ]
    ),
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        request
        .post(
          auditApi.productOrInsurenceReject,
          {
            workTicketId: id,
            reviewRemark: reviewRemark.value
          },
          {
            message: true
          }
        )
        .then(() => {
          done()
        })
      } else {
        done()
      }
    },
  }).then(() => {
    reviewRemark.value = ''
    updateList(pageNum.value)
  })
}
const onCommentInputChange = () => {
  reviewRemark.value = document.getElementById("commentContent").value;
}
onMounted(() => {
  updateList()
})
var OPERATION_TYPES = {
  CREATE_PRODUCT: '创建商品',
  UPDATE_PRODUCT: '更新商品',
  UNDERWRITING_REVIEW_PRODUCT: '商品核保审核',
  ACTIVE_PRODUCT: '商品上架',
  CANCEL_PRODUCT: '取消活动'
}
</script>

<style lang="scss">
// .product-audit {
//   width: 1180px;
// }
</style>
