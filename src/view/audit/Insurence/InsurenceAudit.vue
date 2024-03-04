<template>
  <div class="Insurence">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="全部商品" name=""></el-tab-pane>
      <el-tab-pane label="待审核" name="REVIEW"></el-tab-pane>
      <el-tab-pane label="已通过" name="APPROVAL"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="DECLINE"></el-tab-pane>
    </el-tabs>
    <div style="display: flex; margin: 20px 0">
      <el-input class="elinput" v-model="searchInfo.keyword" placeholder="服务商名称/商品id" />
      <el-select class="elselect" multiple v-model="searchInfo.productStatus" placeholder="商品状态" style="margin: 0 20px">
        <el-option v-for="status in Object.keys(PRODUCT_STATUS)" :label="PRODUCT_STATUS[status]" :value="status" />
      </el-select>
      <div>
        <el-button>重置</el-button>
        <el-button type="primary" @click="updateList(pageNum)">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="70">
        <template #default="scope">{{ scope.row.index }}</template>
      </el-table-column>
      <el-table-column label="商品ID" width="180">
        <template #default="scope"><span>{{ scope.row.snapshot.identifier }}</span></template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template #default="scope">
          {{ scope.row.snapshot.createTime?.split('.')[0]?.replace('T', ' ') }}</template>
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template #default="scope">
          <span>{{ scope.row.snapshot.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="180">
        <template #default="scope">
          <span>{{ getProductStatus(scope.row.snapshot.productStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核意见" width="80">
        <template #default="scope">
          <p>{{ scope.row.reviewRemark }}</p>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="100">
        <template #default="scope">
          <el-button type="primary" v-show="scope.row.snapshot.productId">
            <a :href="'http://123.57.13.5:82/#/user/workbench/product/' + scope.row.snapshot.productId
            " target="_blank">查看</a>
          </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="审核意见" width="160">
        <template #default="scope">
          <p>{{ scope.row.reviewUserId }}</p>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <div class=" w-full flex justify-between">
            <el-popover placement="top" title="查看" :width="200" trigger="click">
              <template #default>
                <ElButton disabled>发送核保PDF</ElButton>
                <ElButton disabled>发送投保信息清单</ElButton>
              </template>
              <template #reference>
                <el-button type="primary">查看</el-button>
              </template>
            </el-popover>

            <el-button :disabled="scope.row.snapshot.productStatus !== 'CREATED_REVIEWED'" type="success"
              @click="approveInsurence(scope.row)">审核</el-button>
          </div>

          <!-- <div class=" w-full">
            <el-button v-if="'法务登录'" @click="rejectInsurence(scope.row)">法务添加审核意见</el-button>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column label="审核时间" width="180">
        <template #default="scope">
          {{ scope.row.reviewTime?.split('.')[0]?.replace('T', ' ') }}
        </template>
      </el-table-column>
    </el-table>
    <reject-dialog v-model:show="dialogInfo.reject" @reset-table="updateList(pageNum)" />
    <approve-dialog v-model:show="dialogInfo.approve" @reset-table="updateList(pageNum)"
      :product-id="currentTableRow.entityId" :work-ticket-id="currentTableRow.workTicketId" />
    <reject-reason v-model:show="dialogInfo.reason" />
    <camp-pagination :total="total" @change-page="updateList" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { request } from '../../../api'
import { auditApi } from '../../../api/modules/audit'
import CampPagination from '../../../component/camp-pagination.vue'
import RejectDialog from './components/RejectDialog.vue'
import ApproveDialog from './components/ApproveDialog.vue'
import RejectReason from './components/RejectReason.vue'
import { getProductStatus, PRODUCT_STATUS } from '../../../utils/getProductStatus'

const activeTab = ref('')
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const tableData = ref([
  {
    workTicketId: 2,
    operation: 'UNDERWRITING_REVIEW_PRODUCT',
    creatorUserId: 0,
    creatorType: 'PROVIDER',
    createRemark: null,
    status: 'REVIEW',
    entityType: 'PRODUCT_INSURANCE',
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
      productStatus: 'CREATED_REVIEWED',
      providerId: 1,
      horizontalShowsResourceList: null,
      activityLocation: null
    }
  }
])
const dialogInfo = reactive({
  approve: false,
  reject: false,
  // 补充拒绝的原因
  reason: false
})
const currentTableRow = ref({})
const searchInfo = reactive({
  operation: undefined,
  statuses: [],
  createTimeStart: undefined,
  createTimeEnd: undefined,
  keyword: undefined,
  productStatus: []
})
watch(activeTab, () => {
  searchInfo.statuses = [activeTab.value].filter(Boolean)
  updateList()
})
const updateList = (currentPage = 1, pageSize = 10) => {
  request
    .post(auditApi.insurenceList, {
      currentPage,
      pageSize,
      ...searchInfo
    }, { loading: true })
    .then(v => {
      total.value = v.details.total
      tableData.value = v.details.list
      pageNum.value = v.details.pageNum
    })
}
const rejectInsurence = (id = 0) => {
  dialogInfo.reject = true

}
const approveInsurence = (row) => {
  currentTableRow.value = row
  dialogInfo.approve = true
}
onMounted(() => {
  updateList()
})
</script>

<style lang="scss">
.Insurence {
  margin-right: 120px;

  .elinput {
    width: 180px;
    height: 30px;
  }

  .elselect {
    width: 180px;
    height: 30px;
  }

  thead {
    .cell {
      justify-content: center;
    }
  }

  .el-dialog {
    h4 {
      margin: 0;
    }

    header {
      height: 64px;
      padding: 0px;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }

    h3 {
      font-size: 16px;
      font-weight: 400;
    }

    .el-radio__label {
      font-weight: 400;
    }

    h4,
    section {
      font-weight: 400;
    }
  }
}</style>
